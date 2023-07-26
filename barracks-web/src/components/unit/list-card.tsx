import { useMemo } from 'react';
import classnames from 'classnames';
import { TagGroup, Tag, Stack, capitalize, Table } from '@fjlaubscher/matter';

// components
import Card from '../card';
import SpecialRules from '../rules/special-rules';

// helpers
import { buildListUnitComposition, calculateCost } from '../../helpers/unit';

// hooks
import { useCore, useWeapons } from '../../hooks/core';

import styles from './unit.module.scss';

export interface Props {
  listUnit: Barracks.List.Unit;
  displayMode?: Barracks.List.DisplayMode;
  showWeapons?: boolean;
}

const ListUnitCard = ({ listUnit, displayMode = 'verbose', showWeapons = false }: Props) => {
  const { data: core } = useCore();
  const { data: weapons } = useWeapons(showWeapons ? listUnit.unit.weapons.keys : []);

  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  const composition = useMemo(() => {
    if (displayMode !== 'minimal' && listUnit.unit.composition) {
      return buildListUnitComposition(listUnit);
    }

    return undefined;
  }, [listUnit, displayMode]);

  const showMore = displayMode !== 'minimal';

  return (
    <Card
      title={listUnit.profile.name}
      description={`${capitalize(listUnit.veterancy)} | ${calculatedCost} pts`}
      testIds={{
        title: 'list-unit-card-title',
        description: 'list-unit-card-description'
      }}
    >
      <Stack direction="column">
        {showMore && (
          <>
            {composition && (
              <div className={styles.section}>
                <h4>Composition</h4>
                <p data-testid="list-unit-card-composition">{composition}</p>
              </div>
            )}
            <div className={styles.section}>
              <h4>Weapons</h4>
              <p data-testid="list-unit-card-weapons">{listUnit.unit.weapons.description}</p>
            </div>
            {listUnit.unit.damage && (
              <div className={styles.section}>
                <h4>Damage Value</h4>
                <p data-testid="list-unit-card-damage">{listUnit.unit.damage}</p>
              </div>
            )}
            {listUnit.unit.transport && (
              <div className={styles.section}>
                <h4>Transport</h4>
                <p data-testid="list-unit-card-transport">{listUnit.unit.transport}</p>
              </div>
            )}
            {listUnit.unit.tow && (
              <div className={styles.section}>
                <h4>Tow</h4>
                <p data-testid="list-unit-card-tow">{listUnit.unit.tow}</p>
              </div>
            )}
            {listUnit.unit.rules.length > 0 ? (
              <SpecialRules className={styles.section} core={core} rules={listUnit.unit.rules} />
            ) : undefined}
          </>
        )}
        {showWeapons && weapons && (
          <Table
            headings={[
              { text: 'Weapon' },
              { text: 'Range' },
              { text: 'Shots' },
              { text: 'Pen' },
              { text: 'Rules' }
            ]}
          >
            {weapons.map((weapon, i) => (
              <tr key={`weapon-type-${i}`}>
                <td>{weapon.type}</td>
                <td className={classnames(styles.center, styles.noWrap)}>{weapon.range}</td>
                <td className={classnames(styles.center, styles.noWrap)}>{weapon.shots}</td>
                <td className={classnames(styles.center, styles.noWrap)}>{weapon.pen}</td>
                <td>{weapon.rules.join(', ')}</td>
              </tr>
            ))}
          </Table>
        )}
        <TagGroup>
          {listUnit.options.map((o, i) => (
            <Tag key={`option-${i}`} variant="info" data-testid="list-unit-card-option">
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
