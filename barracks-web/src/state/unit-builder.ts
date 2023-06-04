import { atom } from 'recoil';

export interface UnitBuilderPayload {
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
