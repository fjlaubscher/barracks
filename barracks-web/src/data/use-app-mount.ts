import { useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useSWR from 'swr';

// storage
import { ARMIES } from './storage';

const useAppMount = () => {
  const [hasSynced, setHasSynced] = useState(false);

  const { data: armies, isLoading } = useSWR<Barracks.Armies>('/data/armies.json');
  const [, setOfflineArmies] = useLocalStorage<Barracks.Armies | undefined>(ARMIES, undefined);

  useEffect(() => {
    if (!hasSynced && armies) {
      setOfflineArmies(armies);
      setHasSynced(true);
    }
  }, [hasSynced, setHasSynced, armies, setOfflineArmies]);

  return { loading: isLoading };
};

export default useAppMount;
