import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

// helpers
import { useObjectStore, useObjectStoreWithKey } from './use-indexed-db';

export const useArmies = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { data, isLoading } = useSWR<Barracks.Armies>('/data/armies.json');
  const {
    data: armies,
    loading: loadingArmies,
    persist: setArmies
  } = useObjectStore<Barracks.Armies>('ARMIES');

  const handleSync = useCallback(
    async (newData: Barracks.Armies) => {
      setIsSyncing(true);
      await setArmies(newData);
      setIsSyncing(false);
    },
    [setIsSyncing, setArmies]
  );

  useEffect(() => {
    if (data) {
      handleSync(data);
    }
  }, [data]);

  return {
    loading: isSyncing || isLoading || loadingArmies,
    data: armies
  };
};

export const useArmy = (key?: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { loading: loadingArmies, data: armies } = useArmies();
  const { data, isLoading } = useSWR<Barracks.Units>(key ? `/data/units/${key}.json` : null);
  const {
    data: units,
    loading: loadingUnits,
    persist: setUnits
  } = useObjectStoreWithKey<Barracks.Units>('UNITS', key);

  const canReadFromStore = useMemo(() => !!armies, [armies]);
  const { data: army, loading: loadingArmy } = useObjectStoreWithKey<Barracks.Army>(
    'ARMIES',
    canReadFromStore ? key : undefined
  );

  const handleSync = useCallback(
    async (data: Barracks.Units) => {
      setIsSyncing(true);
      await setUnits(data);
      setIsSyncing(false);
    },
    [setIsSyncing, setUnits]
  );

  useEffect(() => {
    if (data) {
      handleSync(data);
    }
  }, [data]);

  return {
    army,
    units,
    loading: isSyncing || isLoading || loadingArmy || loadingArmies || loadingUnits
  };
};
