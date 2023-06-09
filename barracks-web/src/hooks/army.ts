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

const useArmy = (key?: string) => {
  const { data, isLoading } = useSWR<Barracks.Units>(key ? `/data/units/${key}.json` : null);
  const { data: army, loading: loadingArmy } = useObjectStoreWithKey('ARMY', key);
  const {
    data: units,
    loading: loadingUnits,
    persist: setUnits
  } = useObjectStoreWithKey('ARMY', key);

  useEffect(() => {
    if (data) {
      setUnits(data);
    }
  }, [data]);

  return { loading: isLoading || loadingArmy || loadingUnits, army, units: units };
};

export default useArmy;
