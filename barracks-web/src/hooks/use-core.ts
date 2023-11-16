import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

// data
import { useObjectStore } from './use-indexed-db';

export const useCore = () => {
  const { data, isLoading } = useSWR<Barracks.Core>(`/data/core.json`);
  const {
    data: coreData,
    loading: loadingCoreData,
    persist: setCoreData
  } = useObjectStore<Barracks.Core>('CORE');

  useEffect(() => {
    if (data) {
      setCoreData(data);
    }
  }, [data]);

  return { data: coreData, loading: isLoading || loadingCoreData };
};

export const useWeapons = (keys: string[]) => {
  const { data: core, loading } = useCore();

  const weapons: Barracks.Core.Weapon[] | undefined = useMemo(() => {
    if (core && keys.length > 0) {
      return keys.map((key) => core.weapons[key]);
    }

    return undefined;
  }, [core, keys]);

  return { data: weapons, loading };
};
