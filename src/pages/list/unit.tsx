import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, Stack, useToast } from '@fjlaubscher/matter';
import { FaSave } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

// components
import BackButton from '../../components/button/back';
import Layout from '../../components/layout';
import UnitListCard from '../../components/unit/list-card';
import UnitBuilder from '../../components/unit/builder';

// helpers
import useList from '../../helpers/use-list';
import useArmy from '../../helpers/use-army';
import { calculateCost } from '../../helpers/unit';

// state
import { CreateListUnitAtom, ListUnitAtom } from '../../state/list';

const AddListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key } = useParams();

  const { type, role } = useRecoilValue(CreateListUnitAtom);
  const listUnit = useRecoilValue(ListUnitAtom);

  const [list, setList] = useList(key!);
  const { units, loading } = useArmy(list?.army || '');

  const handleSubmit = useCallback(() => {
    if (!list || !listUnit) {
      return undefined;
    }

    const newUnit: Barracks.List.Unit = {
      ...listUnit,
      key: `${type}-${role}-${list.units[type][role].length + 1}`,
      points: calculateCost(listUnit)
    };

    setList({
      ...list,
      points: list.points + newUnit.points,
      units: {
        ...list.units,
        [type]: {
          ...list.units[type],
          [role]: [...list.units[type][role], newUnit]
        }
      }
    });
    toast({ text: `${newUnit.unit.name} added.`, variant: 'success' });
    navigate(`/list/${key}/edit`);
  }, [list, type, role, navigate, listUnit]);

  return (
    <Layout
      title="Add Unit"
      isLoading={loading}
      action={
        <IconButton disabled={!listUnit} variant="info" onClick={handleSubmit}>
          <FaSave />
        </IconButton>
      }
    >
      <Stack direction="column">
        <BackButton to={`/list/${key}/edit`} />
        {listUnit && <UnitListCard listUnit={listUnit} />}
        {list && units && <UnitBuilder units={units[type][role]} />}
      </Stack>
    </Layout>
  );
};

export default AddListUnit;
