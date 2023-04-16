import { useCallback } from 'react';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Image, Stack, useLocalStorage } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';
import Section from '../../components/section';

// helpers
import { LISTS, SETTINGS } from '../../helpers/storage';
import { BANNER_IMAGES } from '../../helpers/settings';

import styles from './home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const [settings] = useLocalStorage<Barracks.Settings>(SETTINGS);
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

  const handleListDelete = useCallback(
    (key: string) => {
      if (lists) {
        setLists(lists.filter((l) => l.key !== key));
      }
    },
    [lists, setLists]
  );

  const bannerImage = BANNER_IMAGES[settings?.banner ?? 0];
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
      <Image className={styles.banner} alt={bannerImage.name} src={bannerImage.url} />
      <Stack direction="column">
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
