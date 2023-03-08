import { Alert, Card, Stack, TagGroup, Tag } from '@fjlaubscher/matter';
import { useNavigate } from 'react-router-dom';

// components
import Layout from '../components/layout';

// helpers
import { ARMIES } from '../helpers/storage';
import useLocalStorage from '../helpers/use-local-storage';

const Armies = () => {
  const navigate = useNavigate();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);

  return (
    <Layout title="Armies">
      <Stack direction="column">
        <Alert title="🚧 Don't see everything?" variant="info">
          Currently, Barracks only includes the rules and units from the 2nd edition rulebook.
        </Alert>
        {armies &&
          Object.keys(armies).map((key) => (
            <Card key={key} title={armies[key].name} onClick={() => navigate(`/army/${key}`)}>
              <TagGroup>
                {armies[key].rules.map((rule, i) => (
                  <Tag key={`rule-${i}`}>{rule.name}</Tag>
                ))}
              </TagGroup>
            </Card>
          ))}
      </Stack>
    </Layout>
  );
};

export default Armies;
