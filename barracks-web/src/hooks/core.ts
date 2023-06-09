import { useEffect } from 'react';
import useSWR from 'swr';

// data
import { useObjectStore } from './indexed-db';

const useCore = () => {
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

  return { loading: isLoading || loadingCoreData, data: coreData };
};

export default useCore;
