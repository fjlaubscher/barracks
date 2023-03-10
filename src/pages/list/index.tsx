import { useCallback, useMemo } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, Card, Table, useToast } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';

// components
import Layout from '../../components/layout';
import ListSection from '../../components/list/section';
import ListUnitCard from '../../components/unit/list-card';
import Stats from '../../components/stats';

// helpers
import useArmy from '../../helpers/use-army';
import useCore from '../../helpers/use-core';
import useList from '../../helpers/use-list';
import { calculateOrderDice, shareList } from '../../helpers/list';

import styles from './list.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const { data, loading: loadingCore } = useCore();
  const [list] = useList(key!);
  const { army, loading: loadingArmy } = useArmy(list?.army || '');

  const totalOrderDice = useMemo(() => (list ? calculateOrderDice(list) : 0), [list]);

  const handleShare = useCallback(async () => {
    if (list) {
      const result = await shareList(list);

      if (result.success) {
        toast({
          text: result.method === 'clipboard' ? 'List copied to clipboard.' : 'List shared.',
          variant: 'success'
        });
      } else {
        toast({ text: 'Unable to share list.', variant: 'error' });
      }
    }
  }, [toast, list]);

  return (
    <Layout
      title="List"
      action={
        <IconButton onClick={() => navigate(`/list/${key}/edit`)}>
          <FaEdit />
        </IconButton>
      }
      isLoading={loadingCore || loadingArmy}
      onShareClick={handleShare}
    >
      {army && data && list && (
        <>
          <Stack direction="row">
            <Stats>
              <Stat
                title={army.name}
                value={list.name}
                description={`Created on ${format(parseISO(list.created), 'yyyy-MM-dd')}`}
              />
              <Stat
                title="Points"
                value={`${list.points}/${list.limit}`}
                description={`${totalOrderDice} Order Dice`}
              />
            </Stats>
          </Stack>
          {Object.keys(list.units).map((type) => (
            <div key={`unit-type-${type}`}>
              {Object.keys(list.units[type]).map((role, i) =>
                list.units[type][role].length > 0 ? (
                  <ListSection key={`${type}-role-${i}`} title={type} description={role}>
                    {list.units[type][role].map((unit, i) => (
                      <ListUnitCard key={`list-unit-${i}`} listUnit={unit} />
                    ))}
                  </ListSection>
                ) : undefined
              )}
            </div>
          ))}
          <Stack className={styles.rules} direction="column">
            <ListSection title="Rules" description={army.name}>
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  {rule.description}
                </Card>
              ))}
            </ListSection>
            <ListSection title="Rules" description="Core">
              <Card title="Weapons">
                <Table
                  headings={[
                    { text: 'Small Arms' },
                    { text: 'Range' },
                    { text: 'Shots' },
                    { text: 'Pen' },
                    { text: 'Rules' }
                  ]}
                >
                  {data.weapons['small-arms'].map((weapon, i) => (
                    <tr key={`weapon-type-${i}`}>
                      <td>{weapon.type}</td>
                      <td>{weapon.range}</td>
                      <td>{weapon.shots}</td>
                      <td>{weapon.pen}</td>
                      <td>{weapon.rules.join(', ')}</td>
                    </tr>
                  ))}
                </Table>
                <Table
                  headings={[
                    { text: 'Heavy Weapons' },
                    { text: 'Range' },
                    { text: 'Shots' },
                    { text: 'Pen' },
                    { text: 'Rules' }
                  ]}
                >
                  {data.weapons['heavy-weapons'].map((weapon, i) => (
                    <tr key={`weapon-type-${i}`}>
                      <td>{weapon.type}</td>
                      <td>{weapon.range}</td>
                      <td>{weapon.shots}</td>
                      <td>{weapon.pen}</td>
                      <td>{weapon.rules.join(', ')}</td>
                    </tr>
                  ))}
                </Table>
              </Card>
              <Card title="Hit Rolls">
                <Table headings={[{ text: 'Type' }, { text: 'Modifier' }]}>
                  {data.hit.map((hit, i) => (
                    <tr key={`hit-${i}`}>
                      <td>{hit.type}</td>
                      <td>{hit.modifier}</td>
                    </tr>
                  ))}
                </Table>
              </Card>
              <Card title="Damage">
                <Table
                  headings={[
                    { text: 'Troops and Soft-Skinned Targets' },
                    { text: 'Result Needed' }
                  ]}
                >
                  {data.damage['troops'].map((damage, i) => (
                    <tr key={`damage-${i}`}>
                      <td>{damage.type}</td>
                      <td>{damage.result}</td>
                    </tr>
                  ))}
                </Table>
                <Table headings={[{ text: 'Armoured Targets' }, { text: 'Result Needed' }]}>
                  {data.damage['armoured-targets'].map((damage, i) => (
                    <tr key={`damage-${i}`}>
                      <td>{damage.type}</td>
                      <td>{damage.result}</td>
                    </tr>
                  ))}
                </Table>
              </Card>
            </ListSection>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default List;
