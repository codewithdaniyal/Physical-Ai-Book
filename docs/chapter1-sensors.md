---
id: sensors
title: "Chapter 1: Sensors"
sidebar_label: "Chapter 1: Sensors"
---

# Chapter 1: The Eyes and Ears of Robots

For a robot to interact with the world, it must first perceive it. Just as humans rely on eyes, ears, and touch, robots rely on a suite of sensors to gather data about their environment. In Physical AI, this process is called **Perception**.

## 1. How Robots "See" (Vision)

Vision is the primary sense for humanoid robots. AI models use visual data to identify objects, calculate distances, and plan paths.

* **RGB Cameras:** These work like human eyes, capturing color images. They are essential for object recognition (e.g., "That is a cup").
* **Depth Cameras (RGB-D):** These project infrared light to measure how far away objects are. This helps the robot understand 3D space.
* **LiDAR (Light Detection and Ranging):** A laser sensor that spins rapidly, creating a precise 3D map (Point Cloud) of the surroundings. It is crucial for navigation and avoiding obstacles.

## 2. How Robots "Feel" (Tactile Sensing)

If a robot picks up an egg, it must know how hard to squeeze. If it squeezes too hard, the egg breaks; too soft, and it falls.

* **Tactile Sensors:** specific "skin" patches on robot fingertips that detect pressure.
* **Piezoelectric Sensors:** These generate an electrical signal when touched, allowing the robot to detect vibration or texture.
* **Force/Torque Sensors:** Located in the wrists or ankles, these tell the robot how much weight it is carrying or pushing against.

## 3. Balance and Orientation (IMU)

How does a robot stand on one leg without falling? It uses an **Inertial Measurement Unit (IMU)**.  
An IMU is similar to the inner ear in humans. It contains:
* **Accelerometers:** Measure linear speed.
* **Gyroscopes:** Measure rotation and tilt.

## Code Example: Reading a Sensor

In Physical AI, we often use Python to read sensor data. Here is a simple example of how a script might read distance from a sensor:

```python
class DistanceSensor:
    def get_distance(self):
        # Simulating a sensor reading
        return 1.5 # meters

def avoid_obstacle():
    sensor = DistanceSensor()
    distance = sensor.get_distance()
    
    if distance < 2.0:
        print("Obstacle detected! Stopping robot.")
    else:
        print("Path clear. Moving forward.")

avoid_obstacle()
