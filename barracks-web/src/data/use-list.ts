import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from '@fjlaubscher/matter';
import useSWR from 'swr';

// helpers
import { USER, LISTS } from './storage';

export const createOrUpdatePublicList = async (input: Barracks.PublicList) => {
  const response = await fetch(import.meta.env.VITE_WORKER_URL, {
    method: 'POST',
    body: JSON.stringify(input)
  });

  if (response.ok) {
    const data = await response.json();
    if (data) {
      return data as Barracks.PublicList;
    }
  }

  return undefined;
};

export const deletePublicList = async (key: string) => {
  const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/${key}`, { method: 'DELETE' });
  return response.ok;
};

const useList = (key?: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [user] = useLocalStorage<Barracks.User>(USER);
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);
  const localList = useMemo(
    () => (lists ? lists.filter((l) => l.key === key)[0] : undefined),
    [lists]
  );
  const shouldFetch = useMemo(() => {
    if (key && !localList) {
      return true;
    } else if (key && localList?.public) {
      return true;
    }

    return false;
  }, [user, key, localList]);

  const { data: publicList, isLoading } = useSWR<Barracks.PublicList>(
    shouldFetch ? `${import.meta.env.VITE_WORKER_URL}/${key}` : null
  );

  const handleCreateOrUpdate = useCallback(
    async (updatedList: Barracks.List) => {
      if (lists) {
        const otherLists = lists.filter((l) => l.key !== updatedList.key);
        setLists([updatedList, ...otherLists]);
      } else {
        setLists([updatedList]);
      }

      if (user?.id) {
        setIsUpdating(true);

        if (updatedList.public) {
          await createOrUpdatePublicList({
            createdBy: user.id,
            slug: updatedList.key,
            createdDate: updatedList.created,
            list: {
              ...updatedList
            }
          });
        } else {
          await deletePublicList(updatedList.key);
        }

        setIsUpdating(false);
      }
    },
    [publicList, lists, setLists, isUpdating, setIsUpdating]
  );

  return {
    data: publicList?.list || localList,
    isLoading,
    isUpdating,
    createOrUpdate: handleCreateOrUpdate,
    isOwner: publicList ? publicList.createdBy === user?.id : true
  };
};

export default useList;
