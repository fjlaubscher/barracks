import { useNavigate } from 'react-router-dom';
import { Card, TagGroup, Tag } from '@fjlaubscher/matter';

// helpers
import { ARMY_NAME_MAPPING } from '../../helpers/data';

interface Props {
  list: Barracks.List;
}

const ListCard = ({ list }: Props) => {
  const navigate = useNavigate();

  return (
    <Card title={list.name} onClick={() => navigate(`/list/${list.key}/edit`)}>
      <TagGroup>
        <Tag variant="info">{ARMY_NAME_MAPPING[list.army]}</Tag>
        <Tag>{list.points}pts</Tag>
      </TagGroup>
    </Card>
  );
};

export default ListCard;
