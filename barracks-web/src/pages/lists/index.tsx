import { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat, useLocalStorage } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';

// helpers
import { LISTS } from '../../data/storage';

const Lists = () => {
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
      title="Army Lists"
      action={
        <IconButton onClick={() => navigate(`/list`)}>
          <FaPlus />
        </IconButton>
      }
    >
      <Stack direction="column">
        <Stat title="Barracks" value="Army Lists" />
        {hasLists &&
          lists?.map((list) => (
            <ListCard key={list.key} list={list} onDeleteClick={() => handleListDelete(list.key)} />
          ))}
      </Stack>
    </Layout>
  );
};

export default Lists;
