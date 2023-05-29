import { TagGroup, Tag, Stack, capitalize } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// components
import Card from '../card';

// helpers
import { calculateCost } from '../../helpers/unit';

import styles from './unit.module.scss';

interface Props {
  listUnit: Barracks.List.Unit;
  displayMode?: Barracks.List.DisplayMode;
}

const ListUnitCard = ({ listUnit, displayMode = 'verbose' }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card
      title={listUnit.profile.name}
      description={`${capitalize(listUnit.veterancy)} | ${calculatedCost} pts`}
    >
      <Stack direction="column">
        {displayMode === 'verbose' && (
          <>
            <div className={styles.section}>
              <h4>Composition</h4>
              <p>{listUnit.unit.composition}</p>
            </div>
            <div className={styles.section}>
              <h4>Weapons</h4>
              <p>{listUnit.unit.weapons}</p>
            </div>
            {listUnit.unit.damage && (
              <div className={styles.section}>
                <h4>Damage Value</h4>
                <p>{listUnit.unit.damage}</p>
              </div>
            )}
            {listUnit.unit.transport && (
              <div className={styles.section}>
                <h4>Transport</h4>
                <p>{listUnit.unit.transport}</p>
              </div>
            )}
            {listUnit.unit.tow && (
              <div className={styles.section}>
                <h4>Tow</h4>
                <p>{listUnit.unit.tow}</p>
              </div>
            )}
            {listUnit.unit.rules.length > 0 ? (
              <div className={styles.section}>
                <h4>Special Rules</h4>
                <ul className={styles.rules}>
                  {listUnit.unit.rules.map((rule, i) => (
                    <li key={`rule-${i}`}>{rule}</li>
                  ))}
                </ul>
              </div>
            ) : undefined}
          </>
        )}
        <TagGroup>
          {listUnit.options.map((o, i) => (
            <Tag key={`option-${i}`} variant="info">
              {o.amount > 1 ? `${o.amount} x ` : ''}
              {o.option.name}
            </Tag>
          ))}
        </TagGroup>
      </Stack>
    </Card>
  );
};

export default ListUnitCard;
