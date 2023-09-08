import { useCallback, useState } from 'react';

import { useObjectStore, useObjectStoreWithKey } from './indexed-db';

export const useBattles = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const {
    data: battles,
    loading: loadingBattles,
    persist: setBattles,
    destroy: deleteBattles
  } = useObjectStore<Barracks.Battles>('BATTLES');

  const handleDeleteBattle = useCallback(
    async (key: string) => {
      if (battles) {
        setIsSyncing(true);
        const newLists = { ...battles };
        delete newLists[key];

        await setBattles(newLists);
        setIsSyncing(false);
      }
    },
    [battles, setBattles, setIsSyncing]
  );

  const handleDeleteAll = useCallback(async () => {
    setIsSyncing(true);
    await deleteBattles();
    setIsSyncing(false);
  }, [deleteBattles, setIsSyncing]);

  return {
    data: battles,
    loading: loadingBattles || isSyncing,
    persist: setBattles,
    deleteByKey: handleDeleteBattle,
    deleteAll: handleDeleteAll
  };
};

export const useBattle = (key?: string) => {
  const {
    data: battle,
    loading: loadingBattle,
    persist: setBattle
  } = useObjectStoreWithKey<Barracks.Battle>('BATTLES', key);

  const handlePersist = useCallback(
    async (updatedBattle: Barracks.Battle) => {
      await setBattle(updatedBattle);
    },
    [setBattle]
  );

  return {
    data: battle,
    loading: loadingBattle,
    persist: handlePersist
  };
};
