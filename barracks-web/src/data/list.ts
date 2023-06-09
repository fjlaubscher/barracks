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
