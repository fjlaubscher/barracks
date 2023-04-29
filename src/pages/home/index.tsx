import { FaBookOpen, FaCog, FaFileAlt } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';

import styles from './home.module.scss';

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
      <Stack className={styles.home} direction="column">
        <Stat title="Barracks" value="Home" description="Welcome to Barracks!" />
        <Stack className={styles.tiles} direction="column">
          <Link className={styles.tile} to="/rules">
            <FaBookOpen />
            <span>Need help with the rules?</span>
          </Link>
          <Link className={styles.tile} to="/lists">
            <GiTank />
            <span>Army Lists</span>
          </Link>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Home;
