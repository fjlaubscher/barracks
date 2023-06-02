import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRecoilState } from 'recoil';
import type { Mock } from 'vitest';

vi.mock('recoil', async () => {
  const recoil: any = await vi.importActual('recoil');
  recoil.useRecoilState = vi.fn();
  return recoil;
});
const useRecoilStateMock = useRecoilState as Mock;

// helpers
import { TestWrapper } from '../../helpers/test';

import UnitBuilder from './builder';
import type { Props } from './builder';

import { DEFAULT_UNIT_BUILDER_PAYLOAD, MOCK_UNITS } from './mock';

const transformToListUnit = (
  unit: Barracks.Unit,
  profileIndex = 0,
  veterancyIndex = 0
): Barracks.List.Unit => {
  const profile = unit.profiles[profileIndex];
  const veterancy = Object.keys(profile.cost)[veterancyIndex];

  return {
    key: '',
    unit,
    options: [],
    profile,
    points: 0,
    veterancy
  };
};

const DEFAULT_PAYLOAD = {
  ...DEFAULT_UNIT_BUILDER_PAYLOAD,
  unit: transformToListUnit(MOCK_UNITS[0])
};

const arrangeTest = (props?: Partial<Props>) =>
  render(
    <TestWrapper>
      <UnitBuilder units={props?.units || MOCK_UNITS} initialValues={props?.initialValues} />
    </TestWrapper>
  );

describe('UnitBuilder', () => {
  beforeEach(() => {
    useRecoilStateMock.mockReturnValue([DEFAULT_PAYLOAD, vi.fn()]);
  });

  describe('when a unit is selected', () => {
    it('updates recoil state with the selected unit', () => {
      const unitIndex = 1;
      const setStateMock = vi.fn();
      useRecoilStateMock.mockReturnValue([DEFAULT_PAYLOAD, setStateMock]);
      arrangeTest();

      const select = screen.getByTestId('unit-builder-unit');
      act(() => fireEvent.change(select, { target: { value: unitIndex } }));

      const expectedListUnit = transformToListUnit(MOCK_UNITS[unitIndex]);
      expect(setStateMock).toHaveBeenCalledWith({
        ...DEFAULT_UNIT_BUILDER_PAYLOAD,
        unit: expectedListUnit
      });
    });
  });

  describe('when multiple profiles are present', () => {
    const unitWithProfiles: Barracks.Unit = {
      ...MOCK_UNITS[0],
      profiles: [...MOCK_UNITS[0].profiles, MOCK_UNITS[0].profiles[0]]
    };
    const payload = {
      ...DEFAULT_UNIT_BUILDER_PAYLOAD,
      unit: transformToListUnit(unitWithProfiles)
    };

    it('renders the profile select field', () => {
      useRecoilStateMock.mockReturnValue([payload, vi.fn()]);
      arrangeTest({ units: [unitWithProfiles] });

      expect(screen.getByTestId('unit-builder-profile')).toBeInTheDocument();
    });

    describe('and a profile is selected', () => {
      it('updates recoil state with the selected profile', () => {
        const profileIndex = 1;
        const setStateMock = vi.fn();
        useRecoilStateMock.mockReturnValue([payload, setStateMock]);
        arrangeTest({ units: [unitWithProfiles] });

        const select = screen.getByTestId('unit-builder-profile');
        act(() => fireEvent.change(select, { target: { value: profileIndex } }));

        const expectedListUnit = transformToListUnit(unitWithProfiles, profileIndex);
        expect(setStateMock).toHaveBeenCalledWith({
          ...DEFAULT_UNIT_BUILDER_PAYLOAD,
          unit: expectedListUnit
        });
      });
    });
  });

  describe('when multiple veterancies are present', () => {
    it('renders the veterancy select field', () => {
      arrangeTest();

      expect(screen.getByTestId('unit-builder-veterancy')).toBeInTheDocument();
    });

    describe('and the veterancy is selected', () => {
      it('updates recoil state with the selected veterancy', () => {
        const veterancyIndex = 1;
        const setStateMock = vi.fn();
        useRecoilStateMock.mockReturnValue([DEFAULT_PAYLOAD, setStateMock]);
        arrangeTest();

        const select = screen.getByTestId('unit-builder-veterancy');
        act(() => fireEvent.change(select, { target: { value: veterancyIndex } }));

        const expectedListUnit = transformToListUnit(MOCK_UNITS[0], 0, veterancyIndex);
        expect(setStateMock).toHaveBeenCalledWith({
          ...DEFAULT_UNIT_BUILDER_PAYLOAD,
          unit: expectedListUnit
        });
      });
    });
  });
});
