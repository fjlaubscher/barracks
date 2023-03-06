import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Image } from '@fjlaubscher/matter';

// components
import Layout from '../components/layout';

// helpers
import { ARMIES } from '../helpers/storage';

const Armies = () => {
  const navigate = useNavigate();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);

  return (
    <Layout title="Armies">
      {armies && (
        <Grid>
          {Object.keys(armies).map((key) => (
            <Card key={key} title={armies[key].name} onClick={() => navigate(`/army/${key}`)}>
              <Image src={armies[key].image} alt={armies[key].name} />
            </Card>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Armies;
