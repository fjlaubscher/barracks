import { Stack, Stat } from '@fjlaubscher/matter';
import { Link } from 'react-router-dom';
import { GiPistolGun, GiTank } from 'react-icons/gi';
import { MdMenuBook, MdFlag, MdPeople } from 'react-icons/md';

// components
import AppLayout from '../../components/AppLayout';
import Tile from '../../components/Tile';
import TileGroup from '../../components/TileGroup';

// hooks
import { useCore } from '../../hooks/use-core';

// helpers
import { formatDate } from '../../helpers/date';

const Rules = () => {
  const { data, loading } = useCore();

  return (
    <AppLayout
      title="Rules"
      description="View the core and special rules of Bolt Action 2nd edition."
      isLoading={loading}
    >
      <Stack direction="column">
        <Stat
          title="Barracks"
          value="Rules"
          description={`Last updated: ${formatDate(data?.lastUpdated)}`}
        />
        <TileGroup>
          <Link to="/rules/core">
            <Tile text="Core Rules" icon={<MdMenuBook />} />
          </Link>
          <Link to="/rules/armies">
            <Tile text="Army Rules" icon={<MdFlag />} />
          </Link>
          <Link to="/rules/units">
            <Tile text="Unit Special Rules" icon={<MdPeople />} />
          </Link>
          <Link to="/rules/vehicles">
            <Tile text="Vehicle Special Rules" icon={<GiTank />} />
          </Link>
          <Link to="/rules/weapons">
            <Tile text="Weapon Special Rules" icon={<GiPistolGun />} />
          </Link>
        </TileGroup>
      </Stack>
    </AppLayout>
  );
};

export default Rules;
