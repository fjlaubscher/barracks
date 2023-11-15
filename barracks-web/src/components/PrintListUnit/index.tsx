import { useMemo } from 'react';
import { Stack, capitalize } from '@fjlaubscher/matter';

// helpers
import { buildListUnitComposition } from '../../helpers/unit';

import styles from './PrintListUnit.module.scss';

interface Props {
  listUnit: Barracks.List.Unit;
}

const PrintListUnit = ({ listUnit }: Props) => {
  const composition = useMemo(() => {
    if (listUnit.unit.composition) {
      return buildListUnitComposition(listUnit);
    }

    return undefined;
  }, [listUnit]);

  return (
    <Stack className={styles.print} direction="column">
      <div className={styles.section}>
        <h4>{listUnit.profile.name}</h4>
        <p>
          {capitalize(listUnit.veterancy)} | {listUnit.points} pts
        </p>
      </div>

      {composition && (
        <div className={styles.section}>
          <h4>Composition</h4>
          <p data-testid="print-unit-card-composition">{composition}</p>
        </div>
      )}
      <div className={styles.section}>
        <h4>Weapons</h4>
        <p data-testid="print-unit-card-weapons">{listUnit.unit.weapons.description}</p>
      </div>
      {listUnit.unit.damage && (
        <div className={styles.section}>
          <h4>Damage Value</h4>
          <p data-testid="print-unit-card-damage">{listUnit.unit.damage}</p>
        </div>
      )}
      {listUnit.unit.transport && (
        <div className={styles.section}>
          <h4>Transport</h4>
          <p data-testid="print-unit-card-transport">{listUnit.unit.transport}</p>
        </div>
      )}
      {listUnit.unit.tow && (
        <div className={styles.section}>
          <h4>Tow</h4>
          <p data-testid="print-unit-card-tow">{listUnit.unit.tow}</p>
        </div>
      )}
      {listUnit.unit.rules.length > 0 ? (
        <div className={styles.section}>
          <h4>Special Rules</h4>
          <ul className={styles.rules}>
            {listUnit.unit.rules.map((rule, i) => (
              <li key={`rule-${i}`} data-testid="print-unit-card-rule">
                {rule}
              </li>
            ))}
          </ul>
        </div>
      ) : undefined}
    </Stack>
  );
};

export default PrintListUnit;
