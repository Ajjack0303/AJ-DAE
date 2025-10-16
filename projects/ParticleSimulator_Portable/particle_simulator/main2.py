import tkinter as tk
import random
import math
import colorsys

# --- Constants ---
NUM_PARTICLES = 85  # increased by 5
PARTICLE_SPEED = 2
MERGE_DISTANCE = 18
SPLIT_DISTANCE = 80
COOLDOWN_TIME = 30
TRAIL_LENGTH = 3
DRIFT_STRENGTH = 0.05
MERGE_PROBABILITY = 0.6

SHAPE_CHANGE_INTERVAL = 300  # frames
NEW_PARTICLES_INTERVAL = 180  # frames (~6 sec at 30 FPS)
NEW_PARTICLES_COUNT = 2

# --- Helper functions ---
def random_color():
    h = random.random()
    s = 0.6 + random.random() * 0.4
    v = 0.9 + random.random() * 0.1
    r, g, b = colorsys.hsv_to_rgb(h, s, v)
    return (int(r*255), int(g*255), int(b*255))

def rgb_to_hex(color):
    return f"#{color[0]:02x}{color[1]:02x}{color[2]:02x}"

def blend_colors(c1, c2):
    return tuple((a+b)//2 for a,b in zip(c1,c2))

def distance(p1, p2):
    return math.hypot(p1.x - p2.x, p1.y - p2.y)

# --- Particle Class ---
class Particle:
    def __init__(self, x=None, y=None, color=None, radius=None, shape=None):
        self.x = x if x is not None else random.uniform(0, WIDTH)
        self.y = y if y is not None else random.uniform(0, HEIGHT)
        self.vx = random.uniform(-PARTICLE_SPEED, PARTICLE_SPEED)
        self.vy = random.uniform(-PARTICLE_SPEED, PARTICLE_SPEED)
        self.radius = radius if radius else random.uniform(4,8)
        self.color = color if color else random_color()
        self.split_cooldown = 0
        self.trail = []

        self.shape = shape if shape else random.choice(["circle","oval","star","hexagon"])
        self.rotation = random.uniform(0,360)
        self.rotation_speed = random.uniform(-2,2)
        self.canvas_ids = []  # for trails & particle

    def update(self, frame_count):
        # wind / drift
        self.vx += random.uniform(-DRIFT_STRENGTH, DRIFT_STRENGTH)
        self.vy += random.uniform(-DRIFT_STRENGTH, DRIFT_STRENGTH)
        self.x += self.vx
        self.y += self.vy

        # soft wall collisions
        if self.x - self.radius < 0:
            self.x = self.radius
            self.vx *= -0.9
        elif self.x + self.radius > WIDTH:
            self.x = WIDTH - self.radius
            self.vx *= -0.9
        if self.y - self.radius < 0:
            self.y = self.radius
            self.vy *= -0.9
        elif self.y + self.radius > HEIGHT:
            self.y = HEIGHT - self.radius
            self.vy *= -0.9

        # update trail
        self.trail.append((self.x, self.y, self.radius))
        if len(self.trail) > TRAIL_LENGTH:
            self.trail.pop(0)

        # cooldown decrement
        if self.split_cooldown > 0:
            self.split_cooldown -= 1

        # continuous color cycling
        self.color = tuple((c + random.randint(-3,3)) % 256 for c in self.color)

        # rare shape change
        if frame_count % SHAPE_CHANGE_INTERVAL == 0:
            if random.random() < 0.1:
                self.shape = random.choice(["circle","oval","star","hexagon"])

        # rotation update for polygons
        if self.shape in ["hexagon","star"]:
            self.rotation = (self.rotation + self.rotation_speed) % 360

    def draw(self, canvas):
        # remove previous canvas items
        for cid in self.canvas_ids:
            canvas.delete(cid)
        self.canvas_ids.clear()

        # draw trail
        for i, (tx, ty, tr) in enumerate(self.trail[:-1]):
            fade = (i+1)/len(self.trail)
            trail_color = tuple(int(c*fade) for c in self.color)
            self._draw_shape(canvas, tx, ty, tr, trail_color)

        # draw main particle
        self._draw_shape(canvas, self.x, self.y, self.radius, self.color)

    def _draw_shape(self, canvas, x, y, r, color):
        hex_color = rgb_to_hex(color)
        if self.shape == "circle":
            cid = canvas.create_oval(x-r, y-r, x+r, y+r, fill=hex_color, outline="")
        elif self.shape == "oval":
            cid = canvas.create_oval(x-r*1.2, y-r*0.8, x+r*1.2, y+r*0.8, fill=hex_color, outline="")
        elif self.shape == "hexagon":
            points = []
            for i in range(6):
                angle = math.radians(i*60 + self.rotation)
                points.extend([x + r*math.cos(angle), y + r*math.sin(angle)])
            cid = canvas.create_polygon(points, fill=hex_color, outline="")
        elif self.shape == "star":
            points = []
            for i in range(5):
                outer_angle = math.radians(i*72 + self.rotation)
                inner_angle = math.radians(i*72 + 36 + self.rotation)
                points.extend([
                    x + r*math.cos(outer_angle), y + r*math.sin(outer_angle),
                    x + r*0.5*math.cos(inner_angle), y + r*0.5*math.sin(inner_angle)
                ])
            cid = canvas.create_polygon(points, fill=hex_color, outline="")
        self.canvas_ids.append(cid)

    def merge_with(self, other):
        new_x = (self.x + other.x)/2
        new_y = (self.y + other.y)/2
        new_radius = math.sqrt(self.radius**2 + other.radius**2)
        new_color = blend_colors(self.color, other.color)
        vx = (self.vx + other.vx)/2
        vy = (self.vy + other.vy)/2
        shape = random.choice([self.shape, other.shape])
        p = Particle(new_x, new_y, new_color, new_radius, shape)
        p.vx = vx
        p.vy = vy
        p.split_cooldown = COOLDOWN_TIME
        return p

    def should_split(self, max_radius):
        return self.radius > max_radius

    def split(self, factor):
        new_particles = []
        for _ in range(factor):
            vx = random.uniform(-2,2)
            vy = random.uniform(-2,2)
            new_r = max(3, self.radius / math.sqrt(factor))
            p = Particle(self.x, self.y, self.color, new_r)
            p.vx = vx
            p.vy = vy
            p.split_cooldown = COOLDOWN_TIME
            new_particles.append(p)
        return new_particles

# --- Merge / Split ---
def merge_particles(particles):
    new_particles = []
    merged = set()
    for i, p1 in enumerate(particles):
        if i in merged:
            continue
        for j, p2 in enumerate(particles[i+1:], start=i+1):
            if j in merged:
                continue
            if distance(p1,p2) < MERGE_DISTANCE and random.random() < MERGE_PROBABILITY:
                new_particles.append(p1.merge_with(p2))
                merged.update([i,j])
                break
        else:
            new_particles.append(p1)
    return new_particles

def split_particles(particles):
    new_particles = []
    for p in particles:
        if p.should_split(12) and p.split_cooldown==0:
            new_particles.extend(p.split(random.randint(2,3)))
        else:
            new_particles.append(p)
    return new_particles

# --- Tkinter Setup ---
root = tk.Tk()
root.title("Particle Simulator — Clean Shapes")
root.attributes("-fullscreen", True)
WIDTH = root.winfo_screenwidth()
HEIGHT = root.winfo_screenheight()

canvas = tk.Canvas(root, width=WIDTH, height=HEIGHT, bg="black")
canvas.pack(fill="both", expand=True)

particles = [Particle() for _ in range(NUM_PARTICLES)]
frame_count = 0

def respawn_particle():
    return Particle()

def animate():
    global particles, frame_count
    frame_count += 1

    canvas.delete("all")  # clear previous frame

    # Update particles
    for i, p in enumerate(particles):
        p.update(frame_count)
        if p.radius < 1 or p.x < 0 or p.x > WIDTH or p.y < 0 or p.y > HEIGHT:
            particles[i] = respawn_particle()

    # Merge/Split every 2 frames
    if frame_count % 2 == 0:
        particles[:] = merge_particles(particles)
        particles[:] = split_particles(particles)

    # Add 2 new particles every 6 seconds
    if frame_count % NEW_PARTICLES_INTERVAL == 0:
        for _ in range(NEW_PARTICLES_COUNT):
            particles.append(Particle())

    # Draw particles
    for p in particles:
        p.draw(canvas)

    root.after(33, animate)

animate()
root.mainloop()
