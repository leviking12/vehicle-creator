// src/classes/Car.ts
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

export default class Car extends Vehicle {
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
    this.wheels =
      wheels.length === 4
        ? wheels
        : Array.from({ length: 4 }, () => new Wheel(0, 'Generic'));
  }

  override printDetails(): void {
    super.printDetails();
    console.log('Wheels:');
    this.wheels.forEach((wheel, idx) => {
      console.log(
        `  Wheel ${idx + 1} — Diameter: ${wheel.diameter}, Brand: ${wheel.tireBrand}`
      );
    });
  }
}
