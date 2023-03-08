import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast, IconButton, Stack } from '@fjlaubscher/matter';
import { FaSave } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

// components
import Layout from '../../components/layout';
import UnitCard from '../../components/unit/card';
import UnitBuilder from '../../components/unit/builder';

// helpers
import useList from '../../helpers/use-list';
import useArmy from '../../helpers/use-army';
import { calculateCost } from '../../helpers/unit';

// state
import { CreateListUnitAtom, ListUnitAtom } from '../../state/list';
import BackButton from '../../components/button/back';

const AddListUnit = () => {
  const navigate = useNavigate();
  const { key } = useParams();
  const toast = useToast();

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
          [role]: [newUnit, ...list.units[type][role]]
        }
      }
    });

    toast({ text: `${listUnit.profile.name} added.`, variant: 'success' });
    navigate(`/list/${key}/edit`);
  }, [list, type, role, toast, navigate, listUnit]);

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
        {listUnit && <UnitCard detailed listUnit={listUnit} />}
        {list && units && <UnitBuilder units={units[type][role]} />}
      </Stack>
    </Layout>
  );
};

export default AddListUnit;
