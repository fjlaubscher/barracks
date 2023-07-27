import { capitalize } from '@fjlaubscher/matter';
import { render, screen } from '@testing-library/react';

// helpers
import { buildListUnitComposition, calculateCost } from '../../helpers/unit';
import { TestWrapper } from '../../helpers/test-wrapper';

vi.mock('../../hooks/core', () => ({
  useCore: vi.fn().mockReturnValue({ data: undefined }),
  useWeapons: vi.fn().mockReturnValue({ data: [] })
}));

import UnitListCard from './list-card';
import type { Props } from './list-card';

import { MOCK_LIST_UNIT } from './mock';

const arrangeTest = (props?: Partial<Props>) =>
  render(
    <TestWrapper>
      <UnitListCard
        army={undefined}
        listUnit={props?.listUnit || MOCK_LIST_UNIT}
        displayMode={props?.displayMode}
      />
    </TestWrapper>
  );

describe('ListUnitCard', () => {
  it('renders the profile name as the title', () => {
    arrangeTest();

    expect(screen.getByTestId('list-unit-card-title')).toHaveTextContent(
      MOCK_LIST_UNIT.profile.name
    );
  });

  it('renders the veterancy and cost as the description', () => {
    arrangeTest();

    const expectedCost = calculateCost(MOCK_LIST_UNIT);
    const expectedDescription = `${capitalize(MOCK_LIST_UNIT.veterancy)} | ${expectedCost} pts`;
    expect(screen.getByTestId('list-unit-card-description')).toHaveTextContent(expectedDescription);
  });

  describe('when the displayMode is verbose', () => {
    it('renders the composition', () => {
      arrangeTest({ displayMode: 'verbose' });

      const expectedComposition = buildListUnitComposition(MOCK_LIST_UNIT);
      expect(screen.getByTestId('list-unit-card-composition')).toHaveTextContent(
        expectedComposition!
      );
    });

    it('renders the weapons', () => {
      arrangeTest({ displayMode: 'verbose' });

      expect(screen.getByTestId('list-unit-card-weapons')).toHaveTextContent(
        MOCK_LIST_UNIT.unit.weapons!.description
      );
    });

    describe('and the unit has a damage value', () => {
      it('renders the damage value', () => {
        const damage = '7+';
        const unitWithDamage: Barracks.List.Unit = {
          ...MOCK_LIST_UNIT,
          unit: {
            ...MOCK_LIST_UNIT.unit,
            damage
          }
        };
        arrangeTest({ listUnit: unitWithDamage, displayMode: 'verbose' });

        expect(screen.getByTestId('list-unit-card-damage')).toHaveTextContent(damage);
      });
    });

    describe('and the unit has a transport value', () => {
      it('renders the transport value', () => {
        const transport = '12 soldiers';
        const unitWithTransport: Barracks.List.Unit = {
          ...MOCK_LIST_UNIT,
          unit: {
            ...MOCK_LIST_UNIT.unit,
            transport
          }
        };
        arrangeTest({ listUnit: unitWithTransport, displayMode: 'verbose' });

        expect(screen.getByTestId('list-unit-card-transport')).toHaveTextContent(transport);
      });
    });

    describe('and the unit has a tow value', () => {
      it('renders the tow value', () => {
        const tow = 'Light artillery';
        const unitWithTow: Barracks.List.Unit = {
          ...MOCK_LIST_UNIT,
          unit: {
            ...MOCK_LIST_UNIT.unit,
            tow
          }
        };
        arrangeTest({ listUnit: unitWithTow, displayMode: 'verbose' });

        expect(screen.getByTestId('list-unit-card-tow')).toHaveTextContent(tow);
      });
    });

    describe('and the unit has special rules', () => {
      it('renders the special rules', () => {
        arrangeTest({ displayMode: 'verbose' });

        const specialRules = screen.queryAllByTestId('list-unit-card-rule');
        expect(specialRules.length).toEqual(MOCK_LIST_UNIT.unit.rules.length);
      });
    });
  });

  it('renders the selected options', () => {
    arrangeTest();

    const optionTags = screen.queryAllByTestId('list-unit-card-option');
    expect(optionTags.length).toEqual(MOCK_LIST_UNIT.options.length);
  });
});
