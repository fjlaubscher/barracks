/// <reference types="@cloudflare/workers-types" />

declare namespace Barracks {
  interface Item {
    name: string;
    description: string;
  }

  interface Army {
    lastUpdated: string;
    name: string;
    image: string;
    rules: Item[];
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
    damage?: string;
    transport?: string;
    tow?: string;
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

  interface PublicList {
    createdBy: string;
    createdDate: string;
    list: List;
    slug: string;
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
