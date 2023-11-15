import { useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Stat, Stack } from '@fjlaubscher/matter';

// components
import AppLayout from '../AppLayout';
import ArmyRules from '../ArmyRules';
import DamageRules from '../DamageRules';
import HitRules from '../HitRules';
import MoraleRules from '../MoraleRules';
import OfficerRules from '../OfficerRules';
import Stats from '../Stats';
import Section from '../Section';
import WeaponRules from '../WeaponRules';

// helpers
import { formatDate } from '../../helpers/date';
import { shareList, calculateOrderDice } from '../../helpers/list';

// hooks
import { useArmy } from '../../hooks/use-army';
import { useCore } from '../../hooks/use-core';

import styles from './ListLayout.module.scss';

interface Props {
  action?: ReactNode;
  children: ReactNode;
  list?: Barracks.List;
  showRules?: boolean;
  showWeapons?: boolean;
}

const ListLayout = ({ action, children, list, showRules = false, showWeapons = false }: Props) => {
  const { data, loading: loadingCore } = useCore();
  const { army, loading: loadingArmy } = useArmy(list?.army);

  const totalOrderDice = useMemo(() => calculateOrderDice(list), [list]);

  const handleShareList = useCallback(async () => shareList(list), [list]);

  return (
    <AppLayout
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
            <ArmyRules army={army} />
          </Section>
          <Section title="Rules" description="Damage Value">
            <DamageRules damage={data.damage} />
          </Section>
          <Section title="Rules" description="Hit Modifiers">
            <HitRules hits={data.hit} />
          </Section>
          <Section title="Rules" description="Officer Bonuses">
            <OfficerRules />
          </Section>
          <Section title="Rules" description="Troop Quality and Morale">
            <MoraleRules />
          </Section>
          {showWeapons && (
            <Section title="Rules" description="Weapons">
              <WeaponRules weapons={data.weapons} />
            </Section>
          )}
        </Stack>
      )}
    </AppLayout>
  );
};

export default ListLayout;
