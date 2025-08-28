import tkinter as tk
import random
import math
import json
from typing import List

class Particle:
    def __init__(self, x, y, radius, color, velocity):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.velocity = velocity  # Tuple (vx, vy)
        self.id = None  # Canvas ID (set when drawn)

    def move(self, width, height):
        self.x += self.velocity[0]
        self.y += self.velocity[1]

        # Bounce off walls
        if self.x - self.radius <= 0 or self.x + self.radius >= width:
            self.velocity = (-self.velocity[0], self.velocity[1])
        if self.y - self.radius <= 0 or self.y + self.radius >= height:
            self.velocity = (self.velocity[0], -self.velocity[1])

    def overlaps(self, other) -> bool:
        dx = self.x - other.x
        dy = self.y - other.y
        distance = math.hypot(dx, dy)
        return distance < self.radius + other.radius

    def merge_with(self, other):
        # Weighted average of position
        total_area = self.area() + other.area()
        new_x = (self.x * self.area() + other.x * other.area()) / total_area
        new_y = (self.y * self.area() + other.y * other.area()) / total_area

        # Average velocity
        new_vx = (self.velocity[0] + other.velocity[0]) / 2
        new_vy = (self.velocity[1] + other.velocity[1]) / 2

        # Sum areas and derive new radius
        new_radius = math.sqrt(total_area / math.pi)

        # Color stays as self.color (can be adjusted to blend colors if desired)
        return Particle(
            x=new_x,
            y=new_y,
            radius=new_radius,
            color=self.color,
            velocity=(new_vx, new_vy)
        )

    def area(self):
        return math.pi * self.radius ** 2

class ParticleSimulatorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Particle Simulator")
        self.root.geometry("800x600")
        self.root.configure(bg="black")

        self.canvas = None
        self.particles: List[Particle] = []
        self.counter_label = None
        self.title_frame = None

        # Load stats with exception handling
        self.stats = self.load_stats()

        self.show_title_screen()

    def show_title_screen(self):
        self.title_frame = tk.Frame(self.root, bg="black")
        self.title_frame.pack(expand=True, fill=tk.BOTH)

        title = tk.Label(
            self.title_frame,
            text="🌀 Particle Simulator",
            fg="cyan",
            bg="black",
            font=("Helvetica", 32, "bold")
        )
        title.pack(pady=40)

        start_button = tk.Button(
            self.title_frame,
            text="Start Simulation",
            command=self.start_simulation,
            font=("Helvetica", 18),
            bg="cyan",
            fg="black",
            padx=20,
            pady=10
        )
        start_button.pack()

    def start_simulation(self):
        self.title_frame.destroy()

        self.canvas = tk.Canvas(self.root, bg="black")
        self.canvas.pack(fill=tk.BOTH, expand=True)

        self.counter_label = tk.Label(
            self.root,
            text="Particles: 0",
            bg="black",
            fg="white",
            font=("Helvetica", 12)
        )
        self.counter_label.place(x=10, y=10)

        self.create_particles(100)
        self.animate()

    def create_particles(self, count: int):
        for _ in range(count):
            x = random.randint(50, 750)
            y = random.randint(50, 550)
            radius = random.randint(5, 15)
            color = random.choice(["cyan", "magenta", "yellow", "lime"])
            velocity = (random.uniform(-2, 2), random.uniform(-2, 2))
            particle = Particle(x, y, radius, color, velocity)
            self.particles.append(particle)

            # Update stats
            self.stats["total_particles_created"] += 1

        self.update_particle_counter()

    def update_particle_counter(self):
        self.counter_label.config(text=f"Particles: {len(self.particles)}")

    def animate(self):
        self.canvas.delete("all")

        width = self.canvas.winfo_width()
        height = self.canvas.winfo_height()

        for p in self.particles:
            p.move(width, height)

        # Collision and merging
        merged = set()
        new_particles = []
        for i in range(len(self.particles)):
            if i in merged:
                continue
            p1 = self.particles[i]
            for j in range(i + 1, len(self.particles)):
                if j in merged:
                    continue
                p2 = self.particles[j]
                if p1.overlaps(p2):
                    merged.add(i)
                    merged.add(j)
                    new_p = p1.merge_with(p2)
                    new_particles.append(new_p)

                    # Update stats
                    self.stats["total_merges"] += 1
                    break
            else:
                new_particles.append(p1)

        self.particles = new_particles
        self.update_particle_counter()

        for p in self.particles:
            p.id = self.canvas.create_oval(
                p.x - p.radius, p.y - p.radius,
                p.x + p.radius, p.y + p.radius,
                fill=p.color
            )

        self.root.after(20, self.animate)

    def load_stats(self):
        try:
            with open("particle_stats.json", "r") as f:
                data = json.load(f)
        except FileNotFoundError:
            print("Stats file not found. Initializing new stats.")
            data = {"total_particles_created": 0, "total_merges": 0}
        except json.JSONDecodeError:
            print("Error decoding stats file. Using default stats.")
            data = {"total_particles_created": 0, "total_merges": 0}
        else:
            print("Stats loaded successfully.")
        finally:
            print("Finished attempting to load stats.")
            return data

    def save_stats(self):
        try:
            with open("particle_stats.json", "w") as f:
                json.dump(self.stats, f)
        except IOError as e:
            print(f"Failed to save stats due to an IO error: {e}")
        else:
            print("Stats saved successfully.")
        finally:
            print("Finished attempting to save stats.")

    def on_close(self):
        self.save_stats()
        self.root.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = ParticleSimulatorApp(root)
    root.protocol("WM_DELETE_WINDOW", app.on_close)
    root.mainloop()
