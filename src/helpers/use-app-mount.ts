import { useAsync } from 'react-use';

// storage
import { ARMIES } from './storage';

const useAppMount = () => {
  const { loading: loadingArmies } = useAsync(async () => {
    try {
      const response = await fetch('/data/armies.json');
      const data = await response.json();

      if (data) {
        localStorage.setItem(ARMIES, JSON.stringify(data));
        return data as Barracks.Armies;
      }
    } catch (ex) {}

    return undefined;
  }, []);

  return { loading: loadingArmies };
};

export default useAppMount;
