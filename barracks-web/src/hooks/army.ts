import { useEffect } from 'react';
import useSWR from 'swr';

// helpers
import { useObjectStore, useObjectStoreWithKey } from './indexed-db';

export const useArmies = () => {
  const { data, isLoading } = useSWR<Barracks.Armies>('/data/armies.json');
  const { data: armies, loading: loadingArmies, persist: setArmies } = useObjectStore('ARMIES');

  useEffect(() => {
    if (data) {
      setArmies(data);
    }
  }, [data]);

  return {
    loading: isLoading || loadingArmies,
    data: armies
  };
};

export const useArmy = (key?: string) => {
  const { loading: loadingArmies } = useArmies();
  const { data: army, loading: loadingArmy } = useObjectStoreWithKey<Barracks.Army>('ARMIES', key);
  const { data, isLoading } = useSWR<Barracks.Units>(key ? `/data/units/${key}.json` : null);
  const {
    data: units,
    loading: loadingUnits,
    persist: setUnits
  } = useObjectStoreWithKey<Barracks.Units>('ARMY', key);

  useEffect(() => {
    if (data) {
      setUnits(data);
    }
  }, [data]);

  return { army, units, loading: isLoading || loadingArmy || loadingArmies || loadingUnits };
};
