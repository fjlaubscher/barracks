import { transformToListUnit } from '../../helpers/unit';
import type { UnitBuilderPayload } from '../../state/unit-builder';

export const MOCK_UNITS: Barracks.Unit[] = [
  {
    name: 'Engineer Squad',
    profiles: [
      {
        name: 'Engineer Squad',
        cost: {
          regular: 50,
          veteran: 65
        }
      }
    ],
    composition: {
      description: '1 NCO and 4 soldiers',
      baseSize: 4
    },
    weapons: {
      description: 'Rifles',
      keys: ['infantry-flamethrower', 'smg', 'rifle', 'automatic-rifle']
    },
    options: [
      {
        name: 'Additional soldier',
        cost: {
          regular: 10,
          veteran: 13
        },
        max: 3
      },
      {
        name: 'SMG',
        cost: {
          regular: 3,
          veteran: 3
        },
        max: 2
      },
      {
        name: 'BAR',
        cost: {
          regular: 5,
          veteran: 5
        },
        max: 2
      },
      {
        name: 'Flamethrower',
        cost: {
          regular: 20,
          veteran: 20
        },
        max: 1
      },
      {
        name: 'Anti-tank grenades',
        cost: {
          regular: 2
        },
        max: 8
      }
    ],
    rules: ['Tank Hunters (if anti-tank grenades taken)']
  },
  {
    name: 'Paratrooper Squad',
    profiles: [
      {
        name: 'Paratrooper Squad',
        cost: {
          veteran: 78
        }
      }
    ],
    composition: {
      description: '1 NCO and 5 soldiers',
      baseSize: 5
    },
    weapons: {
      description: 'Rifles',
      keys: ['smg', 'rifle', 'automatic-rifle', 'lmg']
    },
    options: [
      {
        name: 'Additional soldier',
        cost: {
          veteran: 13
        },
        max: 6
      },
      {
        name: 'SMG',
        cost: {
          veteran: 3
        },
        max: 3
      },
      {
        name: 'LMG',
        cost: {
          veteran: 20
        },
        max: 1
      },
      {
        name: 'Anti-tank grenades',
        cost: {
          veteran: 2
        },
        max: 12
      },
      {
        name: 'Stubborn',
        cost: {
          veteran: 1
        },
        max: 12
      }
    ],
    rules: ['Tank Hunters (if anti-tank grenades taken)', 'Stubborn (if option taken)']
  },
  {
    name: 'Paratrooper Squad (Late-War)',
    profiles: [
      {
        name: 'Paratrooper Squad (Late-War)',
        cost: {
          veteran: 84
        }
      }
    ],
    composition: {
      description: '1 NCO and 5 soldiers',
      baseSize: 5
    },
    weapons: {
      description: 'Rifles',
      keys: ['smg', 'rifle', 'automatic-rifle', 'lmg']
    },
    options: [
      {
        name: 'Additional soldier',
        cost: {
          veteran: 14
        },
        max: 6
      },
      {
        name: 'SMG',
        cost: {
          veteran: 3
        },
        max: 5
      },
      {
        name: 'BAR',
        cost: {
          veteran: 5
        },
        max: 1
      },
      {
        name: 'LMG',
        cost: {
          veteran: 20
        },
        max: 2
      },
      {
        name: 'Anti-tank grenades',
        cost: {
          veteran: 2
        },
        max: 12
      }
    ],
    rules: ['Tank Hunters (if anti-tank grenades taken)', 'Stubborn']
  }
];

export const MOCK_LIST_UNIT = transformToListUnit(MOCK_UNITS[0], 0, 0, { 0: 1 });
