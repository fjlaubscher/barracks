declare namespace Barracks {

  type Veterancy = 'inexperienced' | 'regular' | 'veteran'

  interface Item {
    name: string;
    description: string;
  }

  interface Army {
    name: string;
    image: string;
    rules: Item[];
  }

  interface Armies {
    [key: string]: Army;
  }

  interface Cost {
    inexperienced?: number;
    regular?: number;
    veteran?: number;
  }

  interface UnitOption {
    name: string;
    cost: Cost;
    max?: number;
  }

  interface Unit {
    type: "infantry" | "artillery" | "vehicles";
    role: string;
    name: string;
    cost: UnitOption[];
    composition: string;
    weapons: string;
    options: UnitOption[];
    rules: string[];
  }
}
