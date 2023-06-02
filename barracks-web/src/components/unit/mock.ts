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
    composition: '1 NCO and 4 soldiers',
    weapons: 'Rifles',
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
    composition: '1 NCO and 5 soldiers',
    weapons: 'Rifles',
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
    composition: '1 NCO and 5 soldiers',
    weapons: 'Rifles',
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

export const DEFAULT_UNIT_BUILDER_PAYLOAD: UnitBuilderPayload = {
  unit: undefined,
  type: 'infantry',
  role: 'Infantry Squads and Teams'
};
