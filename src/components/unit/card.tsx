import { TagGroup, Tag } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// components
import Card from '../card';

// helpers
import { calculateCost, getColorFromVeterancy } from '../../helpers/unit';
import { capitalize } from '../../helpers/text';

interface Props {
  listUnit: Barracks.List.Unit;
  onDrag?: () => void;
  onClick?: () => void;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
}

const UnitCard = ({ listUnit, onClick, onCopyClick, onDeleteClick }: Props) => {
  const calculatedCost = useMemo(() => listUnit.points || calculateCost(listUnit), [listUnit]);

  return (
    <Card
      title={listUnit.profile.name}
      description={`${calculatedCost} pts`}
      onClick={onClick}
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
            {o.option.name}
          </Tag>
        ))}
      </TagGroup>
    </Card>
  );
};
export default UnitCard;
