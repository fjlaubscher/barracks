declare namespace Barracks {
  type Veterancy = 'inexperienced' | 'regular' | 'veteran';

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
    [key: string]: number;
  }

  interface UnitOption {
    name: string;
    cost: Barracks.Cost;
    max?: number;
  }

  interface Unit {
    name: string;
    profiles: UnitOption[];
    composition: string;
    weapons: string;
    options: UnitOption[];
    rules: string[];
  }

  interface Units {
    [type: string]: {
      [role: string]: Unit[];
    };
  }

  interface Core {
    hit: Barracks.Core.Hit[];
    damage: {
      [key: string]: Barracks.Core.Damage[];
    };
    weapons: {
      [key: string]: Barracks.Core.Weapon[];
    };
  }

  interface List {
    key: string;
    created: string;
    name: string;
    notes: string;
    army: string;
    units: List.Units;
    points: number;
    limit: number;
  }
}

declare namespace Barracks.Core {
  interface Hit {
    type: string;
    modifier: string;
  }

  interface Damage {
    type: string;
    result: string;
  }

  interface Weapon {
    type: string;
    range: string;
    shots: string;
    pen: string;
    rules: string[];
  }
}

declare namespace Barracks.List {
  interface UnitOption {
    option: Barracks.UnitOption;
    amount: number;
  }

  interface Unit {
    key: string;
    unit: Barracks.Unit;
    profile: Barracks.UnitOption;
    options: List.UnitOption[];
    veterancy: string;
    points: number;
  }

  interface Units {
    [type: string]: {
      [role: string]: List.Unit[];
    };
  }
}
