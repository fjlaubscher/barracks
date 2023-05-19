import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import useSWR from 'swr';

// helpers
import { ARMIES } from './storage';

const useArmy = (key?: string) => {
  const [hasSynced, setHasSynced] = useState(false);
  const { data: units, isLoading } = useSWR<Barracks.Units>(key ? `/data/units/${key}.json` : null);
  const [offlineArmies] = useLocalStorage<Barracks.Armies | undefined>(ARMIES, undefined);
  const [offlineUnits, setOfflineUnits] = useLocalStorage<Barracks.Units | undefined>(
    `BARRACKS_${key}_UNITS`,
    undefined
  );
  const army = useMemo(() => (key && offlineArmies ? offlineArmies[key] : undefined), [key]);

  useEffect(() => {
    if (!hasSynced && units) {
      setOfflineUnits(units);
      setHasSynced(true);
    }
  }, [hasSynced, setHasSynced, units, setOfflineUnits]);

  return { loading: isLoading, army, units: units || offlineUnits };
};

export default useArmy;
