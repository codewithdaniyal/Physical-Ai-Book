---
id: actuators
title: "Chapter 2: Actuators"
sidebar_label: "Chapter 2: Actuators"
---

# Chapter 2: The Muscles of the Robot

If sensors are the eyes and ears, **actuators** are the muscles. They are the components that convert energy into physical motion. Without actuators, an AI is just a brain in a jar; with actuators, it becomes an embodied agent capable of changing the world.

## 1. Electric Motors: The Standard

Most commercial humanoids (like Tesla Optimus) use electric motors because they are precise and easy to power.

### DC Motors
* **How they work:** Use continuous current to spin.
* **Pros:** Fast, high efficiency, simple control.
* **Cons:** Require gearboxes to create high torque (strength).

### Stepper Motors
* **How they work:** Move in precise, discrete steps.
* **Pros:** extremely accurate positioning without needing complex sensors.
* **Cons:** Can be jerky and loud; less efficient at high speeds.

## 2. Hydraulic Systems: Heavy Lifters

Hydraulics use pressurized fluid to push pistons. This is how heavy construction machinery works, and it was used in early versions of Boston Dynamics' Atlas robot.

* **Pros:** Incredible power density. Can lift massive weights and survive hard jumps/impacts.
* **Cons:**
    * **Leaky:** Fluids can leak and cause messes.
    * **Loud:** Pumps are noisy.
    * **Inefficient:** Requires constant energy to maintain pressure.

*Note: Modern humanoids are shifting *away* from hydraulics toward electric actuators to be safer around humans.*

## 3. Soft Robotics (Artificial Muscles)

This is the cutting edge of Physical AI. Instead of rigid metal gears, these actuators are made of soft, flexible materials that contract when air or electricity is applied.

* **Pneumatic Artificial Muscles (PAMs):** Rubber tubes that contract when inflated.
* **Shape Memory Alloys:** Metals that change shape when heated.
* **Why it matters:** Soft robots are safe to shake hands with. If they hit a human, they simply bounce off rather than causing injury.

| Actuator Type | Power | Precision | Safety |
| :--- | :--- | :--- | :--- |
| **Electric** | Medium | High | Medium |
| **Hydraulic** | High | Medium | Low |
| **Soft** | Low | Low | High |
