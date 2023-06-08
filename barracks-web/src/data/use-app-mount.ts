import { useEffect, useState } from 'react';
import useSWR from 'swr';

// hooks
import useIndexedDB from './indexed-db/hooks';

// storage
import { ARMIES } from './storage';
import { ARMY_OBJECT_STORE } from './indexed-db/config';

const useAppMount = () => {
  const [hasSynced, setHasSynced] = useState(false);
  const { persist } = useIndexedDB(ARMY_OBJECT_STORE, ARMIES);
  const { data: armies, isLoading } = useSWR<Barracks.Armies>('/data/armies.json');

  useEffect(() => {
    if (!hasSynced && armies) {
      persist(armies);
      setHasSynced(true);
    }
  }, [hasSynced, setHasSynced, armies, persist]);

  return { loading: isLoading };
};

export default useAppMount;
