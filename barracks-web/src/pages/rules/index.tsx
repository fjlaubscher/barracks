import { Stack, Stat } from '@fjlaubscher/matter';
import { GiPistolGun, GiTank } from 'react-icons/gi';
import { FaBookOpen, FaFlag, FaUsers, FaChevronRight } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';

// helpers
import useCore from '../../data/use-core';
import { formatDate } from '../../helpers/date';

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
          <LinkButton className={styles.linkButton} to="/rules/core">
            <FaBookOpen />
            Core Rules
            <FaChevronRight />
          </LinkButton>
          <LinkButton className={styles.linkButton} to="/rules/armies">
            <FaFlag />
            Army Rules
            <FaChevronRight />
          </LinkButton>
          <LinkButton className={styles.linkButton} to="/rules/units">
            <FaUsers />
            Unit Special Rules
            <FaChevronRight />
          </LinkButton>
          <LinkButton className={styles.linkButton} to="/rules/vehicles">
            <GiTank />
            Vehicle Special Rules
            <FaChevronRight />
          </LinkButton>
          <LinkButton className={styles.linkButton} to="/rules/weapons">
            <GiPistolGun />
            Weapon Special Rules
            <FaChevronRight />
          </LinkButton>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Rules;
