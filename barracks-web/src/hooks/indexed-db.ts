import { useCallback, useEffect, useState } from 'react';

import {
  getByKeyAsync,
  getKeysAsync,
  createOrUpdateAsync,
  deleteByKeyAsync,
  destroyAsync
} from '../data/indexed-db';

export const useObjectStore = <T extends { [key: string]: any }>(
  storeName: Barracks.Data.ObjectStore
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const handlePersist = useCallback(
    async (newValue: T) => {
      setLoading(true);
      const newKeys = Object.keys(newValue);

      if (data) {
        const oldKeys = Object.keys(data).filter((key) => !newKeys.includes(key));

        for (let i = 0; i < oldKeys.length; i++) {
          const key = oldKeys[i];
          await deleteByKeyAsync(storeName, key);
        }
      }

      for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        await createOrUpdateAsync(storeName, key, newValue[key]);
      }

      setLoading(false);
      setData(newValue);
    },
    [data, storeName, setData, setLoading]
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
  }, [storeName, setData, setLoading]);

  const handleDestroy = useCallback(async () => {
    setLoading(true);
    await destroyAsync();
    setData(undefined);
    setLoading(false);
  }, [storeName, setData, setLoading]);

  useEffect(() => {
    handleRead();
  }, [storeName]);

  return { data, loading, persist: handlePersist, destroy: handleDestroy };
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
    [storeName, key, setData, setLoading]
  );

  const handleDestroy = useCallback(async () => {
    setLoading(true);
    await deleteByKeyAsync(storeName, key);
    setData(undefined);
    setLoading(false);
  }, [storeName, key, setData, setLoading]);

  useEffect(() => {
    if (key) {
      handleRead();
    }
  }, [key]);

  return { data, loading, persist: handlePersist, destroy: handleDestroy };
};
