import { useMemo } from 'react';
import { Stack, Stat } from '@fjlaubscher/matter';

// components
import Damage from '../rules/damage';
import Hit from '../rules/hit';
import Morale from '../rules/morale';
import PrintListUnit from '../unit/print';
import Section from '../section';
import Stats from '../stats';
import Weapons from '../rules/weapons';

// helpers
import { calculateOrderDice } from '../../helpers/list';

import styles from './list.module.scss';

interface Props {
  army?: Barracks.Army;
  core?: Barracks.Core;
  list?: Barracks.List;
}

const PrintList = ({ army, core, list }: Props) => {
  const totalOrderDice = useMemo(() => calculateOrderDice(list), [list]);

  if (!army || !core || !list) {
    return null;
  }

  return (
    <div className={styles.print}>
      <Stats className={styles.stats}>
        <Stat title={army.name} value={list.name} description="Reinforced Platoon" />
        <Stat
          title="Points"
          value={`${list?.points}/${list?.limit}`}
          description={`Order Dice: ${totalOrderDice}`}
        />
      </Stats>
      {Object.keys(list.units).map((type) => (
        <div key={`unit-type-${type}`} className={styles.roleSection}>
          {Object.keys(list.units[type]).map((role, i) =>
            list.units[type][role].length > 0 ? (
              <Section key={`${type}-role-${i}`} title={type} description={role}>
                {list.units[type][role].map((unit, i) => (
                  <PrintListUnit
                    key={`${type}-${role}-${i}`}
                    listUnit={list.units[type][role][i]}
                  />
                ))}
              </Section>
            ) : undefined
          )}
        </div>
      ))}
      <Stack className={styles.listRules} direction="column">
        <Section className={styles.noBreak} title="Rules" description={army.name}>
          {army.rules.map((rule, i) => (
            <div key={`army-rule-${i}`} className={styles.armyRule}>
              <h4>{rule.name}</h4>
              <p>{rule.description}</p>
            </div>
          ))}
        </Section>
        <Section className={styles.noBreak} title="Rules" description="Damage Value">
          <Damage damage={core.damage} />
        </Section>
        <Section className={styles.noBreak} title="Rules" description="Hit Modifiers">
          <Hit hits={core.hit} />
        </Section>
        <Section className={styles.noBreak} title="Rules" description="Troop Quality and Morale">
          <Morale />
        </Section>
        <Section className={styles.noBreak} title="Rules" description="Weapons">
          <Weapons weapons={core.weapons} />
        </Section>
      </Stack>
    </div>
  );
};

export default PrintList;
