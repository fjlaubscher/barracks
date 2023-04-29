import { Stack, Stat } from '@fjlaubscher/matter';
import { GiFlagObjective, GiPistolGun, GiTank } from 'react-icons/gi';
import { FaBookOpen, FaFlag, FaUsers } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

// helpers
import { formatDate } from '../../helpers/date';
import useCore from '../../helpers/use-core';

import styles from './rules.module.scss';

const Rules = () => {
  const { data, loading } = useCore();

  return (
    <Layout
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
        <Stack direction="column">
          <LinkButton leftIcon={<FaBookOpen />} to="/rules/core">
            Core Rules
          </LinkButton>
          <LinkButton leftIcon={<FaFlag />} to="/rules/armies">
            Army Rules
          </LinkButton>
          <LinkButton leftIcon={<FaUsers />} to="/rules/units">
            Unit Special Rules
          </LinkButton>
          <LinkButton leftIcon={<GiTank />} to="/rules/vehicles">
            Vehicle Special Rules
          </LinkButton>
          <LinkButton leftIcon={<GiPistolGun />} to="/rules/weapons">
            Weapon Special Rules
          </LinkButton>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Rules;
