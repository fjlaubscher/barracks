import { useCallback, useMemo } from 'react';
import { FaBook, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, Card, useToast } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';

// components
import Layout from '../../components/layout';
import LinkButton from '../../components/button/link';
import ListUnitCard from '../../components/unit/list-card';
import Stats from '../../components/stats';
import Section from '../../components/section';
import Weapons from '../../components/rules/weapons';

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
                  <Section key={`${type}-role-${i}`} title={type} description={role}>
                    {list.units[type][role].map((unit, i) => (
                      <ListUnitCard key={`list-unit-${i}`} listUnit={unit} />
                    ))}
                  </Section>
                ) : undefined
              )}
            </div>
          ))}
          <Stack className={styles.rules} direction="column">
            <Section id="army-rules" title="Rules" description={army.name}>
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  <p>{rule.description}</p>
                </Card>
              ))}
            </Section>
            <Section title="Rules" description="Weapons">
              <Weapons weapons={data.weapons} />
            </Section>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default List;
