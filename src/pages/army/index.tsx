import { FaListAlt } from 'react-icons/fa';
import { Card, IconButton, Image, Stack, Stat, Table } from '@fjlaubscher/matter';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// components
import Layout from '../../components/layout';

// helpers
import useArmy from '../../helpers/use-army';

import styles from './army.module.scss';

const Army = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, army, units } = useArmy(key!);

  if (!loading && !army) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout
      title="Army"
      action={
        <IconButton onClick={() => navigate(`/list?army=${key}`)}>
          <FaListAlt />
        </IconButton>
      }
      isLoading={loading}
    >
      {army && units && (
        <Stack direction="column">
          <Stack className={styles.header} direction="column">
            <Image className={styles.image} src={army.image} alt={army.name} />
            <Stack className={styles.rules} direction="column">
              <Stat title={army.name} value="Rules" />
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  {rule.description}
                </Card>
              ))}
            </Stack>
          </Stack>
          {Object.keys(units).map((type) => (
            <Stack key={`unit-type-${type}`} direction="column">
              {Object.keys(units[type]).map((role, i) => (
                <Stack key={`${type}-role-${i}`} direction="column">
                  <Stat className={styles.heading} title={type} value={role} />
                  {units[type][role].map((unit, unitIndex) => (
                    <Card key={`unit-${unitIndex}`} title={unit.name}>
                      <Table
                        headings={[
                          { text: 'Unit' },
                          { text: 'Inexperienced' },
                          { text: 'Regular' },
                          { text: 'Veteran' }
                        ]}
                      >
                        {unit.profiles.map((profile, costIndex) => (
                          <tr key={`unit-cost-${costIndex}`}>
                            <td>{profile.name}</td>
                            <td>{profile.cost.inexperienced || '-'}</td>
                            <td>{profile.cost.regular || '-'}</td>
                            <td>{profile.cost.veteran || '-'}</td>
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
                      {unit.damage && (
                        <div className={styles.section}>
                          <h4>Damage Value</h4>
                          <p>{unit.damage}</p>
                        </div>
                      )}
                      {unit.transport && (
                        <div className={styles.section}>
                          <h4>Transport</h4>
                          <p>{unit.transport}</p>
                        </div>
                      )}
                      {unit.tow && (
                        <div className={styles.section}>
                          <h4>Tow</h4>
                          <p>{unit.tow}</p>
                        </div>
                      )}
                      {unit.options.length > 0 && (
                        <div className={styles.section}>
                          <h4>Options</h4>
                          <ul>
                            {unit.options.map((option, optionIndex) => (
                              <li key={`unit-option-${optionIndex}`}>{option.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
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
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default Army;
