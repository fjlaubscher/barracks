import { Card, TagGroup, Tag } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// helpers
import { calculateCost } from '../../helpers/unit';

interface Props {
  listUnit: Omit<Barracks.List.Unit, 'key'>;
}

const UnitCard = ({ listUnit }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card title={`${listUnit.profile.name} - ${calculatedCost}pts`}>
      <div>{listUnit.unit.composition}</div>
      <div>{listUnit.unit.weapons}</div>
      {listUnit.options.length > 0 ? (
        <TagGroup>
          {listUnit.options.map((o, i) => (
            <Tag key={`option-${i}`}>
              {o.amount > 1 ? `${o.amount} x ` : ''}
              {o.option.name} ({o.option.cost[listUnit.veterancy] * o.amount})
            </Tag>
          ))}
        </TagGroup>
      ) : undefined}
    </Card>
  );
};
export default UnitCard;
