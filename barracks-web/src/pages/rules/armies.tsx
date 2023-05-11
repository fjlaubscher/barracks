import { Alert, Stack, TagGroup, Tag, useLocalStorage, Stat } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// components
import BackButton from '../../components/button/back';
import Card from '../../components/card';
import Layout from '../../components/layout';

// helpers
import { ARMIES } from '../../data/storage';
import { formatDate } from '../../helpers/date';

import styles from './rules.module.scss';

const Armies = () => {
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);

  const armyKeys = useMemo(
    () => (armies ? Object.keys(armies).filter((k) => k !== 'lastUpdated') : []),
    [armies]
  );

  return (
    <Layout title="Armies" description="View the Bolt Action units and rules of each army.">
      <Stack direction="column">
        <Stat
          title="Barracks"
          value="Army Rules"
          description={`Last updated: ${formatDate(armies?.lastUpdated)}`}
        />
        <BackButton to="/rules" />
        <Alert title="🚧 Don't see everything?" variant="info">
          Currently, Barracks only includes the rules and units from the 2nd edition rulebook.
          <br />
          <br />
          Have a specific unit you'd like added?
          <a href="https://github.com/fjlaubscher/barracks/issues" target="_blank">
            https://github.com/fjlaubscher/barracks/issues
          </a>
        </Alert>
        {armies &&
          armyKeys.map((key) => (
            <Link key={key} className={styles.link} to={`/rules/armies/${key}`}>
              <Card key={key} title={armies[key].name} role="link">
                <TagGroup>
                  {armies[key].rules.map((rule, i) => (
                    <Tag variant="info" key={`rule-${i}`}>
                      {rule.name}
                    </Tag>
                  ))}
                </TagGroup>
              </Card>
            </Link>
          ))}
      </Stack>
    </Layout>
  );
};

export default Armies;
