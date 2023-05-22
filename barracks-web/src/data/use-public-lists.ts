import useSWR from 'swr';

const usePublicLists = (userId?: string) => {
  const {
    data: publicLists,
    isLoading,
    mutate,
    isValidating
  } = useSWR<Barracks.PublicList[]>(
    userId ? `${import.meta.env.VITE_WORKER_URL}/lists/${userId}` : null
  );

  return {
    lists: publicLists,
    isLoading: isLoading || isValidating,
    refresh: mutate
  };
};

export default usePublicLists;
