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
  const { data, isLoading } = useSWR<Barracks.PublicList[]>(
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
    [setLists]
  );

  useEffect(() => {
    if (data) {
      handleSync(data);
    }
  }, [data]);

  return {
    data: lists,
    loading: isLoading || loadingLists || isSyncing,
    persist: setLists
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
      setList(updatedList);

      if (user?.id) {
        // deliberately ignore the promise and just make sure it's done
        if (updatedList.public) {
          createOrUpdatePublicList({
            createdBy: user.id,
            slug: updatedList.key,
            createdDate: updatedList.created,
            list: updatedList
          });
        } else {
          deletePublicList(updatedList.key);
        }
      }
    },
    [user]
  );

  const listData = list || data?.list;

  return {
    data: listData,
    loading: isLoading || loadingList,
    persist: handlePersist,
    isOwner: data ? data.createdBy === user?.id : true
  };
};
