# particle.py

import pygame

class Particle:
    def __init__(self, x, y, radius, color, velocity):
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color
        self.velocity = velocity  # (vx, vy)

    def move(self):
        self.x += self.velocity[0]
        self.y += self.velocity[1]

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), self.radius)
