import { useCallback, useEffect, useState } from 'react';

import { getByKeyAsync, createOrUpdateAsync } from '.';

const useIndexedDB = <T>(storeName: string, key: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const handleRead = useCallback(async () => {
    setLoading(true);
    const data = await getByKeyAsync<T>(storeName, key);
    setData(data);
    setLoading(false);
  }, [storeName, key, setData, setLoading]);

  const handlePersist = useCallback(
    async (newData: T) => {
      setLoading(true);
      await createOrUpdateAsync<T>(storeName, key, newData);
      setData(newData);
      setLoading(false);
    },
    [storeName, key, setData]
  );

  useEffect(() => {
    handleRead();
  }, []);

  return { data, loading, persist: handlePersist };
};

export default useIndexedDB;
