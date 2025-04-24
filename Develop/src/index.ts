#!/usr/bin/env node
// src/index.ts
console.log("🚀 Starting Vehicle CLI…");
process.stdin.resume();

import Truck     from './classes/Truck.js';
import Car       from './classes/Car.js';
import Motorbike from './classes/Motorbike.js';
import Wheel     from './classes/Wheel.js';
import Cli       from './classes/Cli.js';

type Vehicle = Car | Truck | Motorbike;

(async () => {
  const vehicles: Vehicle[] = [
    new Truck(
      Cli.generateVin(),
      'red',
      'Ford',
      'F-150',
      2021,
      5000,
      120,
      [],
      10000
    ),
    new Car(
      Cli.generateVin(),
      'blue',
      'Toyota',
      'Camry',
      2021,
      3000,
      130,
      []
    ),
    new Motorbike(
      Cli.generateVin(),
      'black',
      'Harley Davidson',
      'Sportster',
      2021,
      500,
      125,
      [ new Wheel(17, 'Michelin'), new Wheel(17, 'Michelin') ]
    ),
  ];

  const cli = new Cli(vehicles);
  await cli.run();    // ← call run(), not startCli()
})();
