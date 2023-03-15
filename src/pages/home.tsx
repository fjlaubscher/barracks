import { FaBook, FaCog, FaPlus } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Stack } from '@fjlaubscher/matter';

// components
import Layout from '../components/layout';
import LinkButton from '../components/button/link';

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
        <Alert variant="info">
          Barracks is a free and open-source Bolt-Action assistant.
          <br />
          <br />
          Have any issues with the app?
          <a href="https://github.com/fjlaubscher/barracks/issues" target="_blank">
            https://github.com/fjlaubscher/barracks/issues
          </a>
        </Alert>
        <LinkButton leftIcon={<FaBook />} to="/rules">
          Core Rules
        </LinkButton>
        <LinkButton leftIcon={<GiTank />} to="/armies">
          Armies
        </LinkButton>
        <LinkButton leftIcon={<FaPlus />} to="/list">
          New List
        </LinkButton>
      </Stack>
    </Layout>
  );
};

export default Home;
