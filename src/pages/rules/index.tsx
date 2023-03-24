import { Stack, Stat, Image } from '@fjlaubscher/matter';
import { GiPistolGun, GiTank } from 'react-icons/gi';
import { FaBookOpen, FaUsers } from 'react-icons/fa';

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
    <Layout title="Rules" isLoading={loading}>
      <Stack direction="column">
        <Stat
          title="Barracks"
          value="Rules"
          description={`Last updated: ${formatDate(data?.lastUpdated)}`}
        />
        <Stack className={styles.rules} direction="column">
          <Image src="/bolt-action-2nd-ed.jpg" alt="Bolt Action: Second Edition" />
          <Stack direction="column">
            <LinkButton leftIcon={<FaBookOpen />} to="/rules/quick-reference">
              Quick Reference
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
      </Stack>
    </Layout>
  );
};

export default Rules;
