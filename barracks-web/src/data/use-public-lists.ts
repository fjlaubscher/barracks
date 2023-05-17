import useSWR from 'swr';

const usePublicLists = (userId?: string) => {
  const { data: publicLists, isLoading } = useSWR<Barracks.PublicList[]>(
    userId ? `${import.meta.env.VITE_WORKER_URL}/lists/${userId}` : null
  );

  return {
    lists: publicLists,
    isLoading
  };
};

export default usePublicLists;
