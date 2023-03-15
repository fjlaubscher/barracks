import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@fjlaubscher/matter';
import useSWR from 'swr';

// helpers
import { ARMIES } from './storage';

const useArmy = (key: string) => {
  const [hasSynced, setHasSynced] = useState(false);
  const { data: units, isLoading } = useSWR<Barracks.Units>(`/data/units/${key}.json`);

  const [offlineArmies] = useLocalStorage<Barracks.Armies>(ARMIES);
  const [offlineUnits, setOfflineUnits] = useLocalStorage<Barracks.Units>(`BARRACKS_${key}_UNITS`);

  const army = useMemo(() => (offlineArmies ? offlineArmies[key] : undefined), [key]);

  useEffect(() => {
    if (!hasSynced && units) {
      setOfflineUnits(units);
      setHasSynced(true);
    }
  }, [hasSynced, setHasSynced, units, setOfflineUnits]);

  return { loading: isLoading, army, units: units || offlineUnits };
};

export default useArmy;
