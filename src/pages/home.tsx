import { useCallback } from 'react';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Stack, useLocalStorage } from '@fjlaubscher/matter';

// components
import Layout from '../components/layout';
import ListCard from '../components/list/card';
import Section from '../components/section';

// helpers
import { LISTS } from '../helpers/storage';

const Home = () => {
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
      title="Home"
      action={
        <IconButton onClick={() => navigate(`/settings`)}>
          <FaCog />
        </IconButton>
      }
    >
      <Stack direction="column">
        <Alert variant="info">
          Barracks is a free and open-source Bolt-Action assistant.
          <br />
          <br />
          Have any issues with the app?
          <a href="https://github.com/fjlaubscher/barracks/issues" target="_blank">
            https://github.com/fjlaubscher/barracks/issues
          </a>
        </Alert>
        <Section title="Barracks" description="Army Lists" onAddClick={() => navigate('/list')}>
          {hasLists ? (
            lists.map((list) => (
              <ListCard
                key={list.key}
                list={list}
                onDeleteClick={() => handleListDelete(list.key)}
              />
            ))
          ) : (
            <Alert variant="warning">You don&apos;t have any lists yet.</Alert>
          )}
        </Section>
      </Stack>
    </Layout>
  );
};

export default Home;
