import tkinter as tk
import random
import math
import json
from typing import List

class Particle:
    def __init__(self, x, y, radius, color, velocity, growth_rate=0.2):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.velocity = velocity
        self.id = None
        self.growth_rate = growth_rate

    def move(self, width, height):
        self.x += self.velocity[0]
        self.y += self.velocity[1]

        # Bounce off walls
        if self.x - self.radius <= 0 or self.x + self.radius >= width:
            self.velocity = (-self.velocity[0], self.velocity[1])
        if self.y - self.radius <= 0 or self.y + self.radius >= height:
            self.velocity = (self.velocity[0], -self.velocity[1])

        # Grow particle slowly with slight variation
        self.radius += self.growth_rate * random.uniform(0.8, 1.2)

    def overlaps(self, other) -> bool:
        dx = self.x - other.x
        dy = self.y - other.y
        return math.hypot(dx, dy) < self.radius + other.radius

    def merge_with(self, other):
        total_area = self.area() + other.area()
        new_x = (self.x * self.area() + other.x * other.area()) / total_area
        new_y = (self.y * self.area() + other.y * other.area()) / total_area
        new_vx = (self.velocity[0] + other.velocity[0]) / 2
        new_vy = (self.velocity[1] + other.velocity[1]) / 2
        new_radius = math.sqrt(total_area / math.pi)
        return Particle(new_x, new_y, new_radius, self.color, (new_vx, new_vy), self.growth_rate)

    def area(self):
        return math.pi * self.radius ** 2

    def should_split(self, max_radius):
        return self.radius >= max_radius

    def split(self, split_factor=2):
        new_particles = []
        for _ in range(split_factor):
            new_radius = self.radius / math.sqrt(split_factor)
            speed = random.uniform(2, 4)  # faster spread
            angle = random.uniform(0, 2 * math.pi)
            new_velocity = (speed * math.cos(angle), speed * math.sin(angle))
            new_particles.append(
                Particle(self.x, self.y, new_radius, self.color, new_velocity, self.growth_rate)
            )
        return new_particles

class ParticleSimulatorApp:
    colors = [
        "cyan", "magenta", "yellow", "lime", "red", "blue", "green", "orange",
        "purple", "pink", "gold", "silver", "brown", "teal", "navy", "violet",
        "indigo", "turquoise", "coral", "salmon", "khaki", "orchid", "crimson",
        "limegreen", "darkorange", "deeppink", "dodgerblue", "hotpink", "sienna",
        "plum", "darkviolet", "springgreen", "mediumslateblue", "darkcyan",
        "lightseagreen", "darkmagenta", "firebrick", "midnightblue", "tan",
        "thistle", "aqua", "chartreuse", "peru", "goldenrod", "mediumvioletred",
        "mediumturquoise", "royalblue", "darkgoldenrod", "lightcoral", "palegreen"
    ]

    def __init__(self, root):
        self.root = root
        self.root.title("Particle Simulator")
        self.root.geometry("800x600")
        self.root.configure(bg="black")

        self.canvas = None
        self.particles: List[Particle] = []
        self.counter_label = None
        self.title_frame = None

        self.stats = self.load_stats()

        # Optimized parameters for smooth simulation
        self.max_radius = 12
        self.split_factor = 2
        self.refill_threshold = 10
        self.refill_count = 5

        self.show_title_screen()

    def show_title_screen(self):
        self.title_frame = tk.Frame(self.root, bg="black")
        self.title_frame.pack(expand=True, fill=tk.BOTH)

        title = tk.Label(self.title_frame, text="🌀 Particle Simulator", fg="cyan", bg="black", font=("Helvetica", 32, "bold"))
        title.pack(pady=40)

        start_button = tk.Button(self.title_frame, text="Start Simulation", command=self.start_simulation, font=("Helvetica", 18), bg="cyan", fg="black", padx=20, pady=10)
        start_button.pack()

    def start_simulation(self):
        self.title_frame.destroy()
        self.canvas = tk.Canvas(self.root, bg="black")
        self.canvas.pack(fill=tk.BOTH, expand=True)

        self.counter_label = tk.Label(self.root, text="Particles: 0", bg="black", fg="white", font=("Helvetica", 12))
        self.counter_label.place(x=10, y=10)

        self.create_particles(100)
        self.animate()

    def create_particles(self, count: int):
        for _ in range(count):
            x = random.randint(50, 750)
            y = random.randint(50, 550)
            radius = random.randint(4, 8)
            color = random.choice(self.colors)
            velocity = (random.uniform(-3, 3), random.uniform(-3, 3))  # faster movement
            self.particles.append(Particle(x, y, radius, color, velocity))
            self.stats["total_particles_created"] += 1
        self.update_particle_counter()

    def update_particle_counter(self):
        self.counter_label.config(text=f"Particles: {len(self.particles)}")

    def animate(self):
        self.canvas.delete("all")
        width, height = self.canvas.winfo_width(), self.canvas.winfo_height()

        for p in self.particles:
            p.move(width, height)

        # Handle merging
        merged = set()
        new_particles = []
        for i, p1 in enumerate(self.particles):
            if i in merged:
                continue
            for j in range(i + 1, len(self.particles)):
                if j in merged:
                    continue
                p2 = self.particles[j]
                if p1.overlaps(p2):
                    merged.add(i)
                    merged.add(j)
                    new_particles.append(p1.merge_with(p2))
                    self.stats["total_merges"] += 1
                    break
            else:
                new_particles.append(p1)
        self.particles = new_particles

        # Handle splitting
        updated_particles = []
        for p in self.particles:
            if p.should_split(self.max_radius):
                split_particles = p.split(self.split_factor)
                updated_particles.extend(split_particles)
                self.stats["total_particles_created"] += len(split_particles)
            else:
                updated_particles.append(p)
        self.particles = updated_particles

        # Refill if particle count drops below threshold
        if len(self.particles) < self.refill_threshold:
            self.create_particles(self.refill_count)

        # Draw particles
        for p in self.particles:
            p.id = self.canvas.create_oval(
                p.x - p.radius, p.y - p.radius,
                p.x + p.radius, p.y + p.radius,
                fill=p.color
            )

        self.update_particle_counter()
        self.root.after(20, self.animate)

    def load_stats(self):
        try:
            with open("particle_stats.json", "r") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"total_particles_created": 0, "total_merges": 0}

    def save_stats(self):
        try:
            with open("particle_stats.json", "w") as f:
                json.dump(self.stats, f)
        except IOError as e:
            print(f"Failed to save stats: {e}")

    def on_close(self):
        self.save_stats()
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = ParticleSimulatorApp(root)
    root.protocol("WM_DELETE_WINDOW", app.on_close)
    root.mainloop()
