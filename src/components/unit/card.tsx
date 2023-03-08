import { TagGroup, Tag, Table } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// components
import Card from '../card';

// helpers
import { calculateCost, getColorFromVeterancy } from '../../helpers/unit';

import styles from './unit.module.scss';

interface Props {
  listUnit: Barracks.List.Unit;
  detailed?: boolean;
  onDeleteClick?: () => void;
}

const UnitCard = ({ listUnit, detailed, onDeleteClick }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card title={`${listUnit.profile.name} - ${calculatedCost}pts`} onDeleteClick={onDeleteClick}>
      {detailed && (
        <Table headings={[{ text: '' }, { text: '' }]}>
          <tr>
            <td>Composition</td>
            <td>{listUnit.unit.composition}</td>
          </tr>
          <tr>
            <td>Weapons</td>
            <td>{listUnit.unit.weapons}</td>
          </tr>
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
      )}

      <TagGroup>
        <Tag className={styles.veterancy} variant={getColorFromVeterancy(listUnit.veterancy)}>
          {listUnit.veterancy}
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
export default UnitCard;
