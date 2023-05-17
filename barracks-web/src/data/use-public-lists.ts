import useSWR from 'swr';
import { useLocalStorage } from '@fjlaubscher/matter';

import { LISTS, USER } from './storage';
import { useCallback, useState } from 'react';

const usePublicLists = () => {
  const [hasSynced, setHasSynced] = useState(false);
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);
  const [user] = useLocalStorage<Barracks.User>(USER);
  const { data: publicLists, isLoading } = useSWR<Barracks.PublicList[]>(
    user ? `${import.meta.env.VITE_WORKER_URL}/lists/${user.id}` : null
  );

  const handleSync = useCallback(() => {
    if (!hasSynced) {
      const privateLists = lists ? lists.filter((l) => !l.public) : [];
      const listsByUser = publicLists ? publicLists.map((l) => l.list) : [];
      setLists([...listsByUser, ...privateLists]);
      setHasSynced(true);
    }
  }, [publicLists, lists, setLists, hasSynced, setHasSynced]);

  return {
    lists: publicLists,
    isLoading,
    sync: () => setHasSynced(false)
  };
};

export default usePublicLists;
