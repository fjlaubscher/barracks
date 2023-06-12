import { Stack, Stat, Image } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// components
import BackButton from '../../components/button/back';
import Layout from '../../components/layout';
import TileGroup from '../../components/tile/group';

// helpers
import { formatDate } from '../../helpers/date';

// hooks
import { useArmies } from '../../hooks/army';

import styles from './rules.module.scss';

const Armies = () => {
  const { data: armies, loading: loadingArmies } = useArmies();

  const armyKeys = useMemo(
    () => (armies ? Object.keys(armies).filter((k) => k !== 'lastUpdated') : []),
    [armies]
  );

  return (
    <Layout
      title="Armies"
      description="View the Bolt Action units and rules of each army."
      isLoading={loadingArmies}
    >
      <Stack direction="column">
        <Stat
          title="Barracks"
          value="Army Rules"
          description={`Last updated: ${formatDate(armies?.lastUpdated)}`}
        />
        <BackButton to="/rules" />
        <TileGroup>
          {armies &&
            armyKeys.map((key) => (
              <Link key={key} className={styles.link} to={`/rules/armies/${key}`}>
                <Image src={armies[key].image} alt={armies[key].name} />
              </Link>
            ))}
        </TileGroup>
      </Stack>
    </Layout>
  );
};

export default Armies;
