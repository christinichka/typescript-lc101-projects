import { ItemAssignmentContext } from 'twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment';
import { Astronaut } from './Astronaut';
import { Cargo } from './Cargo';
import { Payload } from './Payload';

export class Rocket {
    name: string;
    totalCapacityKg: number;
    cargoItems: Cargo[] = []; 
    astronauts: Astronaut[] = [];
    massKg: number; 

    constructor(name: string, totalCapacityKg: number) {
        this.name = name;
        this.totalCapacityKg = totalCapacityKg;  
    }

    sumMass( items: Payload[] ): number {
    // return sum of all items using each item's massKg property
        let sum: number = 0;
        for (let i = 0; i < items.length; i++) {
           sum += items[i].massKg;
        };
        return sum;   
    }

    currentMassKg(): number {
    // Uses this.sumMass to return the combined mass of this.astronauts and this.cargoItems
        return this.sumMass(this.astronauts) + this.sumMass(this.cargoItems);
    }
    canAdd(item: Payload): boolean {
    // Returns true if this.currentMassKg() + item.massKg <= this.totalCapacityKg
        return (this.currentMassKg() + item.massKg) <= this.totalCapacityKg;
    }
    addCargo(cargo: Cargo): boolean {
    // Uses this.canAdd() to see if another item can be added.
    // If true, adds cargo to this.cargoItems and returns true.
    // If false, returns false.
        if (this.canAdd(cargo)) {
            this.cargoItems.push(cargo);
            return true;
        } else {
            return false;
        }
    }

    addAstronaut(astronaut: Astronaut): boolean {
    // Uses this.canAdd() to see if another astronaut can be added.
    // If true, adds astronaut to this.astronauts and returns true.
    // If false, returns false.
        if (this.canAdd(astronaut)) {
            this.astronauts.push(astronaut);
            return true;
        } else {
            return false;
        }
    }

}