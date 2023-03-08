import { useNavigate } from 'react-router-dom';
import { TagGroup, Tag } from '@fjlaubscher/matter';

// components
import Card from '../card';

// helpers
import { ARMY_NAME_MAPPING } from '../../helpers/data';

interface Props {
  list: Barracks.List;
  onDeleteClick: () => void;
}

const ListCard = ({ list, onDeleteClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      title={list.name}
      onClick={() => navigate(`/list/${list.key}/edit`)}
      onDeleteClick={onDeleteClick}
    >
      <TagGroup>
        <Tag variant="info">{ARMY_NAME_MAPPING[list.army]}</Tag>
        <Tag>{list.points}pts</Tag>
      </TagGroup>
    </Card>
  );
};

export default ListCard;
