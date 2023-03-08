import { atom } from 'recoil';

interface CreateListUnitPayload {
  type: string;
  role: string;
}

export const CreateListUnitAtom = atom<CreateListUnitPayload>({
  key: 'create-list-unit',
  default: {
    type: '',
    role: ''
  }
});

export const ListUnitAtom = atom<Barracks.List.Unit | undefined>({
  key: 'current-list-unit',
  default: undefined
});
