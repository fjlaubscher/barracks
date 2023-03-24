import { Alert, Stack, TagGroup, Tag, useLocalStorage, Stat } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import Card from '../components/card';
import Layout from '../components/layout';

// helpers
import { formatDate } from '../helpers/date';
import { ARMIES } from '../helpers/storage';

const Armies = () => {
  const navigate = useNavigate();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);

  const armyKeys = useMemo(
    () => (armies ? Object.keys(armies).filter((k) => k !== 'lastUpdated') : []),
    [armies]
  );

  return (
    <Layout title="Armies">
      <Stack direction="column">
        <Stat
          title="Barracks"
          value="Armies"
          description={`Last updated: ${formatDate(armies?.lastUpdated)}`}
        />
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
            <Card key={key} title={armies[key].name} onClick={() => navigate(`/army/${key}`)}>
              <TagGroup>
                {armies[key].rules.map((rule, i) => (
                  <Tag variant="info" key={`rule-${i}`}>
                    {rule.name}
                  </Tag>
                ))}
              </TagGroup>
            </Card>
          ))}
      </Stack>
    </Layout>
  );
};

export default Armies;
