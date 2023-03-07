import { useLocalStorage } from 'react-use';
import { Alert, Grid, Stack } from '@fjlaubscher/matter';
import { FaPlus } from 'react-icons/fa';

// components
import Layout from '../components/layout';
import LinkButton from '../components/button/link';
import ListCard from '../components/list/card';

// helpers
import { LISTS } from '../helpers/storage';

const Armies = () => {
  const [lists] = useLocalStorage<Barracks.List[]>(LISTS);

  const hasLists = lists && lists.length > 0;

  return (
    <Layout title="Lists">
      {hasLists ? (
        <Grid>
          {lists.map((list) => (
            <ListCard key={list.key} list={list} />
          ))}
        </Grid>
      ) : (
        <Stack direction="column">
          <Alert variant="info">You don&apos;t have any lists yet.</Alert>
          <LinkButton leftIcon={<FaPlus />} to="/list">
            Create a List
          </LinkButton>
        </Stack>
      )}
    </Layout>
  );
};

export default Armies;
