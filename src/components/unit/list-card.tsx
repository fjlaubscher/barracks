import { Card, TagGroup, Tag, Table } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// helpers
import { calculateCost, getColorFromVeterancy } from '../../helpers/unit';
import { capitalize } from '../../helpers/text';

import styles from './unit.module.scss';

interface Props {
  listUnit: Barracks.List.Unit;
}

const ListUnitCard = ({ listUnit }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card title={`${listUnit.profile.name} - ${calculatedCost}pts`}>
      <Table headings={[{ text: '' }, { text: '' }]}>
        <tr>
          <td>Composition</td>
          <td>{listUnit.unit.composition}</td>
        </tr>
        <tr>
          <td>Weapons</td>
          <td>{listUnit.unit.weapons}</td>
        </tr>
        {listUnit.unit.damage && (
          <tr>
            <td>Damage Value</td>
            <td>{listUnit.unit.damage}</td>
          </tr>
        )}
        {listUnit.unit.transport && (
          <tr>
            <td>Transport</td>
            <td>{listUnit.unit.transport}</td>
          </tr>
        )}
        {listUnit.unit.tow && (
          <tr>
            <td>Tow</td>
            <td>{listUnit.unit.tow}</td>
          </tr>
        )}
        {listUnit.unit.rules.length > 0 ? (
          <tr>
            <td>Special Rules</td>
            <td>
              <ul className={styles.rules}>
                {listUnit.unit.rules.map((rule, i) => (
                  <li key={`rule-${i}`}>{rule}</li>
                ))}
              </ul>
            </td>
          </tr>
        ) : undefined}
      </Table>
      <TagGroup>
        <Tag variant={getColorFromVeterancy(listUnit.veterancy)}>
          {capitalize(listUnit.veterancy)}
        </Tag>
        {listUnit.options.map((o, i) => (
          <Tag key={`option-${i}`}>
            {o.amount > 1 ? `${o.amount} x ` : ''}
            {o.option.name} ({o.option.cost[listUnit.veterancy] * o.amount})
          </Tag>
        ))}
      </TagGroup>
    </Card>
  );
};

export default ListUnitCard;
