import { useCallback, useEffect, useState } from 'react';

import { getByKeyAsync, getKeysAsync, createOrUpdateAsync } from '../data/indexed-db';

export const useObjectStore = <T extends { [key: string]: any }>(
  storeName: Barracks.Data.ObjectStore
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const handlePersist = useCallback(
    async (newValue: T) => {
      setLoading(true);
      const keys = Object.keys(newValue);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        await createOrUpdateAsync(storeName, key, newValue[key]);
      }

      setLoading(false);
      setData(newValue);
    },
    [storeName]
  );

  const handleRead = useCallback(async () => {
    setLoading(true);
    const keys = await getKeysAsync(storeName);
    const storedData: Record<string, any> = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = await getByKeyAsync(storeName, key);
      storedData[key] = value;
    }

    setData(storedData as T);
    setLoading(false);
  }, [storeName]);

  useEffect(() => {
    handleRead();
  }, []);

  return { data, loading, persist: handlePersist };
};

export const useObjectStoreWithKey = <T>(storeName: Barracks.Data.ObjectStore, key?: string) => {
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
