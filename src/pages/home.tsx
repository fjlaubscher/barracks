import { FaCog } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, IconButton } from '@fjlaubscher/matter';

// components
import Image from '../components/image';
import Layout from '../components/layout';

// helpers
import { ARMIES } from '../helpers/storage';

const Home = () => {
  const navigate = useNavigate();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);

  return (
    <Layout
      title="Home"
      action={
        <IconButton onClick={() => navigate(`/settings`)}>
          <FaCog />
        </IconButton>
      }
    >
      {armies && (
        <Grid>
          {Object.keys(armies).map((key) => (
            <Card key={key} title={armies[key].name} onClick={() => navigate(`/army/${key}`)}>
              <Image src={armies[key].image} alt={armies[key].name} />
              {armies[key].rules.map((rule, index) => (
                <div key={`rule-${index}`}>
                  <h4>{rule.name}</h4>
                  <p>{rule.description}</p>
                </div>
              ))}
            </Card>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
