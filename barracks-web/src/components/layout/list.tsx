import { useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Stat, Stack } from '@fjlaubscher/matter';

// components
import Card from '../../components/card';
import Damage from '../../components/rules/damage';
import Hit from '../../components/rules/hit';
import Layout from '../../components/layout';
import Morale from '../rules/morale';
import Stats from '../../components/stats';
import Section from '../../components/section';
import Weapons from '../../components/rules/weapons';

// helpers
import { formatDate } from '../../helpers/date';
import { shareList, calculateOrderDice } from '../../helpers/list';

// hooks
import { useArmy } from '../../hooks/army';
import useCore from '../../hooks/core';

import styles from './layout.module.scss';

interface Props {
  action: ReactNode;
  children: ReactNode;
  list?: Barracks.List;
  showRules?: boolean;
}

const ListLayout = ({ action, children, list, showRules = false }: Props) => {
  const { data, loading: loadingCore } = useCore();
  const { army, loading: loadingArmy } = useArmy(list?.army);

  const totalOrderDice = useMemo(() => calculateOrderDice(list), [list]);

  const handleShareList = useCallback(async () => shareList(list), [list]);

  return (
    <Layout
      title="Army List"
      action={action}
      isLoading={!list || loadingCore || loadingArmy}
      onShareClick={handleShareList}
    >
      <Stats className={styles.stats}>
        <Stat
          title={army?.name || 'Army'}
          value={list?.name || 'List Name'}
          description={`Created on ${formatDate(list?.created)}`}
        />
        <Stat
          title="Points"
          value={`${list?.points}/${list?.limit}`}
          description={`Order Dice: ${totalOrderDice}`}
        />
      </Stats>
      {children}
      {army && data && showRules && (
        <Stack className={styles.rules} direction="column">
          <Section id="army-rules" title="Rules" description={army.name}>
            {army.rules.map((rule, i) => (
              <Card key={`army-rule-${i}`} title={rule.name}>
                <p>{rule.description}</p>
              </Card>
            ))}
          </Section>
          <Section title="Rules" description="Damage Value">
            <Damage damage={data.damage} />
          </Section>
          <Section title="Rules" description="Hit Modifiers">
            <Hit hits={data.hit} />
          </Section>
          <Section title="Rules" description="Troop Quality and Morale">
            <Morale />
          </Section>
          <Section title="Rules" description="Weapons">
            <Weapons weapons={data.weapons} />
          </Section>
        </Stack>
      )}
    </Layout>
  );
};

export default ListLayout;
