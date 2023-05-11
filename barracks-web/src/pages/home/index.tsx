import { FaBookOpen, FaCog } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';

import styles from './home.module.scss';

const DESCRIPTION = `
Barracks is a Bolt Action assistant app designed to enhance your gaming experience by providing a user-friendly interface for managing your army list and tracking unit stats.
With features such as point calculation, force organization, and customizable army lists, Barracks streamlines the preparation process and allows you to focus on strategy and tactics during gameplay.

Barracks is not associated with or endorsed by Warlord Games, the publisher of Bolt Action.
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout
      title="Home"
      description={DESCRIPTION}
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
