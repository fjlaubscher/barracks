import { MdMenuBook, MdSettings, MdInfo } from 'react-icons/md';
import { GiTank } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat } from '@fjlaubscher/matter';

// components
import AppLayout from '../../components/AppLayout';
import Tile from '../../components/Tile';
import TileGroup from '../../components/TileGroup';

const DESCRIPTION = `As a fellow tabletop gaming enthusiast, I'm thrilled to introduce you to Barracks — a personal hobby project of mine designed to enhance your experience with Warlord Games' popular wargame, Bolt Action.
Barracks is an open-source app built entirely on web technologies, providing you with an intuitive and convenient platform for two essential aspects of the game: rules references and army list building.

Barracks is not associated with or endorsed by Warlord Games, the publisher of Bolt Action.`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <AppLayout
      title="Home"
      description={DESCRIPTION}
      action={
        <IconButton onClick={() => navigate(`/settings`)}>
          <MdSettings />
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
            <Tile icon={<MdMenuBook />} text="Rules" />
          </Link>
          <Link to="/about">
            <Tile icon={<MdInfo />} text="What is Barracks?" />
          </Link>
        </TileGroup>
      </Stack>
    </AppLayout>
  );
};

export default Home;
