// src/classes/Motorbike.ts
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

export default class Motorbike extends Vehicle {
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super(vin, color, make, model, year, weight, topSpeed);

    if (wheels.length === 2) {
      this.wheels = wheels;
    } else {
      this.wheels = [
        new Wheel(0, 'Generic'),
        new Wheel(0, 'Generic'),
      ];
    }
  }

  wheelie(): void {
    console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails(): void {
    super.printDetails();
    console.log('Wheels:');
    this.wheels.forEach((wheel, idx) => {
      const pos = idx === 0 ? 'Front' : 'Rear';
      console.log(
        `  ${pos} Wheel — Diameter: ${wheel.diameter}, Brand: ${wheel.tireBrand}`
      );
    });
  }
}
