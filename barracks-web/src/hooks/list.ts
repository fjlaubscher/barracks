import { useCallback, useEffect, useState } from 'react';
import { useReadLocalStorage } from 'usehooks-ts';
import useSWR from 'swr';

// data
import { createOrUpdatePublicList, deletePublicList } from '../data/list';
import { USER } from '../data/storage';

import { useObjectStore, useObjectStoreWithKey } from './indexed-db';

export const useLists = () => {
  const user = useReadLocalStorage<Barracks.User>(USER);
  const [isSyncing, setIsSyncing] = useState(false);
  const { data, isLoading, mutate } = useSWR<Barracks.PublicList[]>(
    user?.id ? `${import.meta.env.VITE_WORKER_URL}/lists/${user.id}` : null
  );
  const {
    data: lists,
    loading: loadingLists,
    persist: setLists
  } = useObjectStore<Barracks.Lists>('LIST');

  const handleSync = useCallback(
    async (publicLists: Barracks.PublicList[]) => {
      setIsSyncing(true);
      const listsToSync: Barracks.Lists = publicLists.reduce(
        (data, list) => ({
          ...data,
          [list.slug]: list.list
        }),
        {} as Barracks.Lists
      );
      await setLists(listsToSync);
      setIsSyncing(false);
    },
    [setLists, setIsSyncing]
  );

  const handleDeleteList = useCallback(
    async (key: string) => {
      if (lists) {
        setIsSyncing(true);
        await deletePublicList(key);

        const newLists = { ...lists };
        delete newLists[key];

        await setLists(newLists);
        setIsSyncing(false);
      }
    },
    [lists, setLists, setIsSyncing]
  );

  const handleDeleteAll = useCallback(async () => {}, [mutate, setIsSyncing]);

  useEffect(() => {
    if (data) {
      handleSync(data);
    }
  }, [data]);

  return {
    data: lists,
    loading: isLoading || loadingLists || isSyncing,
    persist: setLists,
    deleteByKey: handleDeleteList,
    deleteAll: handleDeleteAll
  };
};

export const useList = (key?: string) => {
  const user = useReadLocalStorage<Barracks.User>(USER);
  const { data, isLoading } = useSWR<Barracks.PublicList>(
    key ? `${import.meta.env.VITE_WORKER_URL}/${key}` : null
  );
  const {
    data: list,
    loading: loadingList,
    persist: setList
  } = useObjectStoreWithKey<Barracks.List>('LIST', key);

  const handlePersist = useCallback(
    async (updatedList: Barracks.List) => {
      if (user?.id) {
        // deliberately ignore the promise and just make sure it's done
        if (updatedList.public) {
          await createOrUpdatePublicList({
            createdBy: user.id,
            slug: updatedList.key,
            createdDate: updatedList.created,
            list: updatedList
          });
        } else {
          await deletePublicList(updatedList.key);
        }
      }

      setList(updatedList);
    },
    [user]
  );

  const listData = data ? data.list : list;

  return {
    data: listData,
    loading: isLoading || loadingList,
    persist: handlePersist,
    isOwner: data ? data.createdBy === user?.id : true
  };
};
