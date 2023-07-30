declare namespace Barracks {
  interface Army {
    id: number;
    name: string;
    image: string;
    lastUpdated: string;
  }

  interface Unit {
    id: number;
    name: string;
    composition: string;
    models: number;
  }

  interface UnitOption {
    id: number;
    name: string;
    inexperiencedCost: number | null;
    regularCost: number | null;
    veteranCost: number | null;
    max: number | null;
    weaponId: number | null;
    ruleId: number | null;
    isUnitUpgrade: boolean;
  }

  interface UnitProfile {
    id: number;
    unitId: number;
    name: string;
    inexperiencedCost: number | null;
    regularCost: number | null;
    veteranCost: number | null;
    armour: string | null;
    transport: string | null;
    tow: string | null;
  }

  interface Weapon {
    id: number;
    type: string;
    range: string;
    shots: number;
    pen: string;
    isHeavy: boolean;
  }

  interface UnitProfileWeapon {
    id: number;
    weaponId: number;
    unitProfileId: number;
  }

  interface Rule {
    id: number;
    name: string;
    description: string;
  }

  interface ArmyRule {
    id: number;
    armyId: number;
    ruleId: number;
  }

  interface UnitRule {
    id: number;
    ruleId: number;
    unitId: number;
  }

  interface WeaponRule {
    id: number;
    weaponId: number;
    ruleId: number;
  }

  interface List {
    id: number;
    armyId: number;
    createdDate: string;
    createdBy: string;
    name: string;
    description: string;
    points: number;
    limit: number;
    isPublic: boolean;
  }

  interface ListUnit {
    id: number;
    listId: number;
    unitProfileId: number;
  }

  interface ListUnitOption {
    id: number;
    listUnitId: number;
    unitOptionId: number;
  }
}
