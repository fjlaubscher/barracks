import { TagGroup, Tag, Table } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// components
import Card from '../card';

// helpers
import { calculateCost, getColorFromVeterancy } from '../../helpers/unit';
import { capitalize } from '../../helpers/text';

interface Props {
  listUnit: Barracks.List.Unit;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
}

const UnitCard = ({ listUnit, onCopyClick, onDeleteClick }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card
      title={`${listUnit.profile.name} - ${calculatedCost}pts`}
      onCopyClick={onCopyClick}
      onDeleteClick={onDeleteClick}
    >
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
export default UnitCard;
