import { useCallback } from 'react';
import { Alert, IconButton, Stack, useLocalStorage } from '@fjlaubscher/matter';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// components
import Layout from '../components/layout';
import ListCard from '../components/list/card';

// helpers
import { LISTS } from '../helpers/storage';

const Armies = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

  const handleListDelete = useCallback(
    (key: string) => {
      if (lists) {
        setLists(lists.filter((l) => l.key !== key));
      }
    },
    [lists, setLists]
  );

  const hasLists = lists && lists.length > 0;

  return (
    <Layout
      title="Lists"
      action={
        <IconButton onClick={() => navigate('/list')}>
          <FaPlus />
        </IconButton>
      }
    >
      <Stack direction="column">
        {hasLists ? (
          lists.map((list) => (
            <ListCard key={list.key} list={list} onDeleteClick={() => handleListDelete(list.key)} />
          ))
        ) : (
          <Alert variant="info">You don&apos;t have any lists yet.</Alert>
        )}
      </Stack>
    </Layout>
  );
};

export default Armies;
