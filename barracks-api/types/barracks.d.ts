declare namespace Barracks {
  interface Army {
    id: number;
    name: string;
    image: string;
    lastUpdated: string;
  }

  interface Unit {
    id: number;
    armyId: number;
    roleId: number;
    typeId: number;
    name: string;
    description: string;
    models: number;
  }

  interface UnitRole {
    id: number;
    name: string;
  }

  interface UnitType {
    id: number;
    name: string;
  }

  interface UnitOption {
    id: number;
    name: string;
    inexperiencedCost: number | null;
    regularCost: number | null;
    veteranCost: number | null;
    maxAllowed: number | null;
    weaponId: number | null;
    ruleId: number | null;
    unitId: number;
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
    name: string;
    range: string;
    shots: number;
    pen: string;
    isHeavy: boolean;
  }

  interface UnitWeapon {
    id: number;
    unitId: number;
    weaponId: number;
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
