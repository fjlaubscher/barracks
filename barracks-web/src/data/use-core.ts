import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@fjlaubscher/matter';
import useSWR from 'swr';

// helpers
import { CORE_DATA } from './storage';

const useCore = () => {
  const [hasSynced, setHasSynced] = useState(false);
  const { data, isLoading } = useSWR<Barracks.Core>(`/data/core.json`);

  const [offlineData, setOfflineData] = useLocalStorage<Barracks.Core>(CORE_DATA);

  const coreData = useMemo(() => (data ? offlineData : undefined), [data]);

  useEffect(() => {
    if (!hasSynced && data) {
      setOfflineData(data);
      setHasSynced(true);
    }
  }, [hasSynced, setHasSynced, data, setOfflineData]);

  return { loading: isLoading, data: coreData };
};

export default useCore;
