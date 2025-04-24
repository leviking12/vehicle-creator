// src/classes/Vehicle.ts
export default abstract class Vehicle {
  constructor(
    public vin: string,
    public color: string,
    public make: string,
    public model: string,
    public year: number,
    public weight: number,
    public topSpeed: number
  ) {}

  printDetails(): void {
    console.log('-----------------------------------');
    console.log(`VIN: ${this.vin}`);
    console.log(`Make/Model: ${this.make} ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight}`);
    console.log(`Top Speed: ${this.topSpeed}`);
    console.log(`Color: ${this.color}`);
    console.log('-----------------------------------');
  }

  start(): void {
    console.log(`${this.make} ${this.model} started.`);
  }

  accelerate(amount: number): void {
    console.log(`${this.make} ${this.model} accelerated by ${amount} MPH.`);
  }

  decelerate(amount: number): void {
    console.log(`${this.make} ${this.model} decelerated by ${amount} MPH.`);
  }

  stop(): void {
    console.log(`${this.make} ${this.model} stopped.`);
  }

  turn(direction: 'left' | 'right'): void {
    console.log(`${this.make} ${this.model} turned ${direction}.`);
  }

  reverse(): void {
    console.log(`${this.make} ${this.model} is reversing.`);
  }
}
