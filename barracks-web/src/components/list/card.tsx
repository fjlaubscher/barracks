import { useNavigate } from 'react-router-dom';
import { TagGroup, Tag } from '@fjlaubscher/matter';

// components
import Card from '../card';

// helpers
import { ARMY_NAME_MAPPING } from '../../helpers/data';
import { formatDate } from '../../helpers/date';

interface Props {
  list: Barracks.List;
  onDeleteClick: () => void;
}

const ListCard = ({ list, onDeleteClick }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      title={list.name}
      description={`${ARMY_NAME_MAPPING[list.army]} | ${list.points} pts`}
      onClick={() => navigate(`/list/${list.key}/edit`)}
      onDeleteClick={onDeleteClick}
      role="link"
    >
      <TagGroup>
        <Tag variant="info">{formatDate(list.created)}</Tag>
        {list.public && <Tag variant="success">Public</Tag>}
      </TagGroup>
    </Card>
  );
};

export default ListCard;
