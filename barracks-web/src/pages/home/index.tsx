import { FaBookOpen, FaCog, FaInfoCircle } from 'react-icons/fa';
import { GiTank } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';
import Tile from '../../components/tile';
import TileGroup from '../../components/tile/group';

const DESCRIPTION = `As a fellow tabletop gaming enthusiast, I'm thrilled to introduce you to Barracks — a personal hobby project of mine designed to enhance your experience with Warlord Games' popular wargame, Bolt Action.
Barracks is an open-source app built entirely on web technologies, providing you with an intuitive and convenient platform for two essential aspects of the game: rules references and army list building.

Barracks is not associated with or endorsed by Warlord Games, the publisher of Bolt Action.`;

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
      <Stack direction="column">
        <Stat title="Barracks" value="Home" description="Welcome to Barracks!" />
        <TileGroup>
          <Link to="/lists">
            <Tile icon={<GiTank />} text="Army Lists" />
          </Link>
          <Link to="/rules">
            <Tile icon={<FaBookOpen />} text="Rules" />
          </Link>
          <Link to="/about">
            <Tile icon={<FaInfoCircle />} text="What is Barracks?" />
          </Link>
        </TileGroup>
      </Stack>
    </Layout>
  );
};

export default Home;
