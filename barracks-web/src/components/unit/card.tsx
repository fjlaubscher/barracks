import { TagGroup, Tag, capitalize } from '@fjlaubscher/matter';
import { useMemo } from 'react';

// components
import Card from '../card';

// helpers
import { calculateCost } from '../../helpers/unit';

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
      description={`${capitalize(listUnit.veterancy)} | ${calculatedCost} pts`}
      onClick={onClick}
      onCopyClick={onCopyClick}
      onDeleteClick={onDeleteClick}
    >
      <TagGroup>
        {listUnit.options.map((o, i) => (
          <Tag key={`option-${i}`} variant="info">
            {o.amount > 1 ? `${o.amount} x ` : ''}
            {o.option.name}
          </Tag>
        ))}
      </TagGroup>
    </Card>
  );
};
export default UnitCard;
