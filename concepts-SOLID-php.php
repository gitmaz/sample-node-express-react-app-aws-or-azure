<?php

/*
SOLID is an acronym that represents a set of design principles for writing maintainable and scalable software. Each letter in SOLID stands for a different principle. Here's a brief overview of each principle along with simple PHP examples:

Single Responsibility Principle (SRP):
*/

//1- A class should have only one reason to change.

// Bad design violating SRP
class User {
    public function save() {
        // Save user to the database
    }

    public function sendEmail() {
        // Send a welcome email to the user
    }
}

// Good design following SRP
class User {
    public function save() {
        // Save user to the database
    }
}

class EmailSender {
    public function sendWelcomeEmail(User $user) {
        // Send a welcome email to the user
    }
}

//2- Open/Closed Principle (OCP):
//Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

// Bad design violating OCP
class Rectangle {
    public $width;
    public $height;
}

class AreaCalculator {
    public function calculateArea(Rectangle $rectangle) {
        return $rectangle->width * $rectangle->height;
    }
}

// If we want to add a new shape (e.g., Circle), we need to modify the AreaCalculator.

// Good design following OCP
interface Shape {
    public function calculateArea();
}

class Rectangle implements Shape {
    public $width;
    public $height;

    public function calculateArea() {
        return $this->width * $this->height;
    }
}

class Circle implements Shape {
    public $radius;

    public function calculateArea() {
        return pi() * $this->radius * $this->radius;
    }
}

/*
3- Liskov Substitution Principle (LSP):
Subtypes must be substitutable for their base types without altering the correctness of the program.
 */

// Bad design violating LSP
class Bird {
    public function fly() {
        // Fly logic
    }
}

class Penguin extends Bird {
    public function fly() {
        // This violates LSP because penguins can't fly.
    }
}

// Good design following LSP
interface Flyable {
    public function fly();
}

class Bird implements Flyable {
    public function fly() {
        // Fly logic
    }
}

class Penguin implements Flyable {
    public function fly() {
        // No-op, as penguins can't fly
    }
}

//4- Interface Segregation Principle (ISP):
//A client should not be forced to implement interfaces it does not use.

// Bad design violating ISP
interface Worker {
    public function work();

    public function eat();
}

class Human implements Worker {
    public function work() {
        // Work logic
    }

    public function eat() {
        // Eat logic
    }
}

// The problem is that not all workers (e.g., robots) eat.

// Good design following ISP
interface Workable {
    public function work();
}

interface Eatable {
    public function eat();
}

class Human implements Workable, Eatable {
    public function work() {
        // Work logic
    }

    public function eat() {
        // Eat logic
    }
}


//5-Dependency Inversion Principle (DIP):

//High-level modules should not depend on low-level modules. Both should depend on abstractions.

// Bad design violating DIP
class LightBulb {
    public function turnOn() {
        // Turn on the light bulb
    }
}

class Switch {
    private $bulb;

    public function __construct(LightBulb $bulb) {
    $this->bulb = $bulb;
    }

    public function operate() {
        // Operate the switch and turn on the light bulb
        $this->bulb->turnOn();
    }
}

// Good design following DIP
interface Switchable {
    public function turnOn();
}

class LightBulb implements Switchable {
    public function turnOn() {
        // Turn on the light bulb
    }
}

class Switch {
    private $device;

    public function __construct(Switchable $device) {
        $this->device = $device;
    }

        public function operate() {
        // Operate the switch
        $this->device->turnOn();
    }
}
