import { useCallback, useMemo } from 'react';
import { useLocalStorage } from 'react-use';

// helpers
import { LISTS } from './storage';

const useList = (
  key: string
): [Barracks.List | undefined, (updatedList: Barracks.List) => void] => {
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

  const list = useMemo(() => (lists ? lists.filter((l) => l.key === key)[0] : undefined), [lists]);

  const handleSetList = useCallback(
    (updatedList: Barracks.List) => {
      if (lists) {
        const otherLists = lists.filter((l) => l.key !== updatedList.key);
        setLists([updatedList, ...otherLists]);
      } else {
        setLists([updatedList]);
      }
    },
    [lists, setLists]
  );

  return [list, handleSetList];
};

export default useList;
