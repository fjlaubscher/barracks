import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';
import { Container, Card, Grid, IconButton } from '@fjlaubscher/matter';
import { Navigate, useParams } from 'react-router-dom';

// components
import Image from '../../components/image';
import Layout from '../../components/layout';
import Table from '../../components/table';

// helpers
import useArmy from '../../helpers/use-army';

import styles from './army.module.scss';

const Army = () => {
  const { key } = useParams();
  const { loading, army, units } = useArmy(key || '');
  const [showSearch, setShowSearch] = useState(false);

  if (!loading && !army) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout
      title={army?.name || 'Loading'}
      action={
        <IconButton onClick={() => setShowSearch(!showSearch)}>
          <FaSearch />
        </IconButton>
      }
      isLoading={loading}
    >
      {army && <Image src={army.image} alt={army.name} />}
      <Grid simple>
        {units?.map((unit, i) => (
          <Card key={`unit-${i}`} title={unit.name}>
            <Table
              headings={[
                { text: 'Unit' },
                { text: 'Inexperienced' },
                { text: 'Regular' },
                { text: 'Veteran' }
              ]}
            >
              {unit.cost.map((uc, costIndex) => (
                <tr key={`unit-cost-${costIndex}`}>
                  <td>{uc.name}</td>
                  <td>{uc.cost.inexperienced || '-'}</td>
                  <td>{uc.cost.regular || '-'}</td>
                  <td>{uc.cost.veteran || '-'}</td>
                </tr>
              ))}
            </Table>
            <div className={styles.section}>
              <h4>Composition</h4>
              <p>{unit.composition}</p>
            </div>
            <div className={styles.section}>
              <h4>Weapons</h4>
              <p>{unit.weapons}</p>
            </div>
            {unit.rules.length > 0 && (
              <div className={styles.section}>
                <h4>Special Rules</h4>
                <ul>
                  {unit.rules.map((rule, ruleIndex) => (
                    <li key={`unit-rule-${ruleIndex}`}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </Grid>
    </Layout>
  );
};

export default Army;
