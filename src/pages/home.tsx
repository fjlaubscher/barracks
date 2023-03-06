import { FaCog, FaPlus, FaDatabase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, IconButton, Stack } from '@fjlaubscher/matter';

// components
import Layout from '../components/layout';

const Home = () => {
  const navigate = useNavigate();

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
        <Alert title="Welcome to Barracks!" variant="info">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis exercitationem non fuga
          laboriosam maiores soluta neque tenetur porro! Repellat labore explicabo eveniet natus,
          doloribus minima sequi quaerat nulla blanditiis voluptas.
        </Alert>
        <Button variant="info" leftIcon={<FaDatabase />} onClick={() => navigate('/armies')}>
          Browse Armies
        </Button>
        <Button leftIcon={<FaPlus />} onClick={() => navigate('/list/create')}>
          Create a List
        </Button>
      </Stack>
    </Layout>
  );
};

export default Home;
