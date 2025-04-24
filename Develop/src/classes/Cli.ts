// src/classes/Cli.ts
import inquirer from 'inquirer';
import Truck from './Truck.js';
import Car from './Car.js';
import Motorbike from './Motorbike.js';
import Wheel from './Wheel.js';

type Vehicle = Car | Truck | Motorbike;

export default class Cli {
  vehicles: Vehicle[];

  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /** Main loop */
  async run(): Promise<void> {
    let selectedVin: string | undefined = undefined;
    let exit = false;

    while (!exit) {
      if (!selectedVin) {
        // Main menu: create, select, or exit
        const { menu } = await inquirer.prompt({
          type: 'list',
          name: 'menu',
          message: 'What would you like to do?',
          choices: ['Create a vehicle', 'Select a vehicle', 'Exit'],
        });

        if (menu === 'Create a vehicle') {
          selectedVin = await this.createVehicle();
        } else if (menu === 'Select a vehicle') {
          selectedVin = await this.selectVehicle();
        } else {
          exit = true;
          break;
        }
      } else {
        // Action menu for the selected vehicle
        const vehicle = this.vehicles.find(v => v.vin === selectedVin)!;
        console.log(`\n▶ Current vehicle: ${vehicle.make} ${vehicle.model} (${vehicle.vin})\n`);

        const { action } = await inquirer.prompt({
          type: 'list',
          name: 'action',
          message: 'Select an action:',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate +5 MPH',
            'Decelerate -5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Tow another vehicle',
            'Wheelie',
            'Back to main menu',
            'Exit',
          ],
        });

        switch (action) {
          case 'Print details':
            vehicle.printDetails();
            break;
          case 'Start vehicle':
            vehicle.start();
            break;
          case 'Accelerate +5 MPH':
            vehicle.accelerate(5);
            break;
          case 'Decelerate -5 MPH':
            vehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            vehicle.stop();
            break;
          case 'Turn right':
            vehicle.turn('right');
            break;
          case 'Turn left':
            vehicle.turn('left');
            break;
          case 'Reverse':
            vehicle.reverse();
            break;
          case 'Tow another vehicle':
            if (vehicle instanceof Truck) {
              await this.towVehicle(vehicle);
            } else {
              console.log('🚫 Only trucks can tow.');
            }
            break;
          case 'Wheelie':
            if (vehicle instanceof Motorbike) {
              vehicle.wheelie();
            } else {
              console.log('🚫 Only motorbikes can wheelie.');
            }
            break;
          case 'Back to main menu':
            selectedVin = undefined;
            break;
          case 'Exit':
            exit = true;
            break;
        }
      }
    }

    console.log('\n👋 Goodbye!');
  }

  /** Prompt for vehicle creation, return its VIN */
  private async createVehicle(): Promise<string> {
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: 'Select type of vehicle to create:',
      choices: ['Car', 'Truck', 'Motorbike'],
    });

    if (type === 'Car')    return this.createCar();
    if (type === 'Truck')  return this.createTruck();
                           return this.createMotorbike();
  }

  private async createCar(): Promise<string> {
    const a = await inquirer.prompt([
      { type: 'input', name: 'color', message: 'Color?' },
      { type: 'input', name: 'make',  message: 'Make?'  },
      { type: 'input', name: 'model', message: 'Model?' },
      { type: 'input', name: 'year',  message: 'Year?'  },
      { type: 'input', name: 'weight', message: 'Weight?' },
      { type: 'input', name: 'topSpeed', message: 'Top Speed?' },
    ]);

    const car = new Car(
      Cli.generateVin(),
      a.color,
      a.make,
      a.model,
      +a.year,
      +a.weight,
      +a.topSpeed,
      []
    );
    this.vehicles.push(car);
    console.log(`✅ Created Car (${car.vin})`);
    return car.vin;
  }

  private async createTruck(): Promise<string> {
    const a = await inquirer.prompt([
      { type: 'input', name: 'color', message: 'Color?' },
      { type: 'input', name: 'make',  message: 'Make?'  },
      { type: 'input', name: 'model', message: 'Model?' },
      { type: 'input', name: 'year',  message: 'Year?'  },
      { type: 'input', name: 'weight', message: 'Weight?' },
      { type: 'input', name: 'topSpeed', message: 'Top Speed?' },
      { type: 'input', name: 'towingCapacity', message: 'Towing Capacity?' },
    ]);

    const truck = new Truck(
      Cli.generateVin(),
      a.color,
      a.make,
      a.model,
      +a.year,
      +a.weight,
      +a.topSpeed,
      [],
      +a.towingCapacity
    );
    this.vehicles.push(truck);
    console.log(`✅ Created Truck (${truck.vin})`);
    return truck.vin;
  }

  private async createMotorbike(): Promise<string> {
    const a = await inquirer.prompt([
      { type: 'input', name: 'color', message: 'Color?' },
      { type: 'input', name: 'make',  message: 'Make?'  },
      { type: 'input', name: 'model', message: 'Model?' },
      { type: 'input', name: 'year',  message: 'Year?'  },
      { type: 'input', name: 'weight', message: 'Weight?' },
      { type: 'input', name: 'topSpeed', message: 'Top Speed?' },
      { type: 'input', name: 'frontDiameter', message: 'Front Wheel Diameter?' },
      { type: 'input', name: 'frontBrand',    message: 'Front Wheel Brand?'    },
      { type: 'input', name: 'rearDiameter',  message: 'Rear Wheel Diameter?'  },
      { type: 'input', name: 'rearBrand',     message: 'Rear Wheel Brand?'     },
    ]);

    const bike = new Motorbike(
      Cli.generateVin(),
      a.color,
      a.make,
      a.model,
      +a.year,
      +a.weight,
      +a.topSpeed,
      [
        new Wheel(+a.frontDiameter, a.frontBrand),
        new Wheel(+a.rearDiameter,  a.rearBrand),
      ]
    );
    this.vehicles.push(bike);
    console.log(`✅ Created Motorbike (${bike.vin})`);
    return bike.vin;
  }

  private async selectVehicle(): Promise<string> {
    const { vin } = await inquirer.prompt({
      type: 'list',
      name: 'vin',
      message: 'Select a vehicle:',
      choices: this.vehicles.map(v => ({
        name: `${v.vin} — ${v.make} ${v.model}`,
        value: v.vin
      })),
    });
    return vin;
  }

  private async towVehicle(truck: Truck): Promise<void> {
    const { vin } = await inquirer.prompt({
      type: 'list',
      name: 'vin',
      message: 'Which vehicle to tow?',
      choices: this.vehicles
        .filter(v => v.vin !== truck.vin)
        .map(v => ({ name: `${v.vin}`, value: v.vin })),
    });
    const target = this.vehicles.find(v => v.vin === vin)!;
    truck.tow(target);
  }
}
