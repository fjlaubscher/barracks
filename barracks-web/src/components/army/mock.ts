export const MOCK_UNIT: Barracks.Unit = {
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
};
