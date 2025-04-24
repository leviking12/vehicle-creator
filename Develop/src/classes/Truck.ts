// src/classes/Truck.ts
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

export default class Truck extends Vehicle implements AbleToTow {
  wheels: Wheel[];
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super(vin, color, make, model, year, weight, topSpeed);
    this.wheels =
      wheels.length === 4
        ? wheels
        : Array.from({ length: 4 }, () => new Wheel(0, 'Generic'));
    this.towingCapacity = towingCapacity;
  }

  tow(vehicle: Vehicle): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(
        `Truck ${this.make} ${this.model} is towing ${vehicle.make} ${vehicle.model}.`
      );
    } else {
      console.log(
        `Cannot tow ${vehicle.make} ${vehicle.model}: weight (${vehicle.weight}) exceeds capacity (${this.towingCapacity}).`
      );
    }
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Towing Capacity: ${this.towingCapacity}`);
    console.log('Wheels:');
    this.wheels.forEach((wheel, idx) => {
      console.log(
        `  Wheel ${idx + 1} — Diameter: ${wheel.diameter}, Brand: ${wheel.tireBrand}`
      );
    });
  }
}
