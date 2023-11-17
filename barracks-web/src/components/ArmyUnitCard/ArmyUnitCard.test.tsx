import { render, screen } from '@testing-library/react';

// helpers
import { TestWrapper } from '../../helpers/TestWrapper';

import ArmyUnitCard from '.';
import type { Props } from '.';

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
};

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <ArmyUnitCard {...props} />
    </TestWrapper>
  );

describe('Army Unit Card', () => {
  it('renders unit name', () => {
    arrangeTest({ unit: MOCK_UNIT });

    expect(screen.getByTestId('army-unit-card-title')).toHaveTextContent(MOCK_UNIT.name);
  });

  it('renders unit profiles', () => {
    arrangeTest({ unit: MOCK_UNIT });

    const profiles = screen.getByTestId('army-unit-card-profiles');
    expect(profiles).toBeInTheDocument();

    MOCK_UNIT.profiles.forEach((profile, index) => {
      // name
      expect(
        profiles.querySelector(`tr:nth-child(${index + 1}) td:nth-child(1)`)
      ).toHaveTextContent(profile.name);

      // inexperienced cost
      expect(
        profiles.querySelector(`tr:nth-child(${index + 1}) td:nth-child(2)`)
      ).toHaveTextContent(`${profile.cost.inexperienced ?? '-'}`);

      // regular cost
      expect(
        profiles.querySelector(`tr:nth-child(${index + 1}) td:nth-child(3)`)
      ).toHaveTextContent(`${profile.cost.regular ?? '-'}`);

      // veteran cost
      expect(
        profiles.querySelector(`tr:nth-child(${index + 1}) td:nth-child(4)`)
      ).toHaveTextContent(`${profile.cost.veteran ?? '-'}`);
    });
  });

  it('renders unit composition', () => {
    arrangeTest({ unit: MOCK_UNIT });

    expect(screen.getByTestId('army-unit-card-composition').querySelector('p')).toHaveTextContent(
      MOCK_UNIT.composition!.description
    );
  });

  it('renders unit weapons', () => {
    arrangeTest({ unit: MOCK_UNIT });

    expect(screen.getByTestId('army-unit-card-weapons').querySelector('p')).toHaveTextContent(
      MOCK_UNIT.weapons!.description
    );
  });

  describe('when the unit has a damage value', () => {
    it('renders the damage value', () => {
      const damage = '7+';
      arrangeTest({
        unit: {
          ...MOCK_UNIT,
          damage
        }
      });

      expect(screen.getByTestId('army-unit-card-damage').querySelector('p')).toHaveTextContent(
        damage
      );
    });
  });

  describe('when the unit has a transport value', () => {
    it('renders the transport value', () => {
      const transport = '12 soldiers';
      arrangeTest({
        unit: {
          ...MOCK_UNIT,
          transport
        }
      });

      expect(screen.getByTestId('army-unit-card-transport').querySelector('p')).toHaveTextContent(
        transport
      );
    });
  });

  describe('when the unit has a tow value', () => {
    it('renders the tow value', () => {
      const tow = 'Light artillery';
      arrangeTest({
        unit: {
          ...MOCK_UNIT,
          tow
        }
      });

      expect(screen.getByTestId('army-unit-card-tow').querySelector('p')).toHaveTextContent(tow);
    });
  });

  describe('when the unit has options', () => {
    it('renders the option correctly', () => {
      arrangeTest({ unit: MOCK_UNIT });

      const options = screen.getByTestId('army-unit-card-options');
      expect(options).toBeInTheDocument();

      MOCK_UNIT.options.forEach((option, index) => {
        // name
        expect(
          options.querySelector(`tr:nth-child(${index + 1}) td:nth-child(1)`)
        ).toHaveTextContent(option.name);

        // cost
        const costContent = Object.keys(option.cost)
          .map((key) => option.cost[key])
          .join(' | ');
        expect(
          options.querySelector(`tr:nth-child(${index + 1}) td:nth-child(2)`)
        ).toHaveTextContent(costContent);

        // max size
        expect(
          options.querySelector(`tr:nth-child(${index + 1}) td:nth-child(3)`)
        ).toHaveTextContent(`${option.max}`);
      });
    });
  });

  describe('when the unit has special rules', () => {
    it('renders the special rules', () => {
      arrangeTest({ unit: MOCK_UNIT });

      const specialRules = screen.getByTestId('army-unit-card-special-rules');
      expect(specialRules).toBeInTheDocument();

      MOCK_UNIT.rules.forEach((rule, index) => {
        expect(specialRules.querySelector(`li:nth-child(${index + 1})`)).toHaveTextContent(rule);
      });
    });
  });
});
