import { useToast } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { useAsync, useLocalStorage } from 'react-use';

import { ARMIES } from './storage';

const useArmy = (key: string) => {
  const toast = useToast();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);
  const { loading, value: units } = useAsync(async () => {
    try {
      const response = await fetch(`/data/units/${key}.json`);
      const data = await response.json();

      if (data) {
        return data as Barracks.Unit[];
      }

      return undefined;
    } catch (ex) {
      toast({ text: 'Unable to fetch units.', variant: 'error' });
      return undefined;
    }
  }, [key]);

  const army = useMemo(() => (armies ? armies[key] : undefined), [key]);

  return { loading, army, units };
};

export default useArmy;
