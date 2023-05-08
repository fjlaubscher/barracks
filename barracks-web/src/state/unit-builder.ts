import { atom } from 'recoil';

interface UnitBuilderPayload {
  type: string;
  role: string;
  unit: Barracks.List.Unit | undefined;
}

export const UnitBuilderAtom = atom<UnitBuilderPayload>({
  key: 'unit-builder',
  default: {
    type: '',
    role: '',
    unit: undefined
  }
});
