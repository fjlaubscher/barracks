import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconButton, Stack, useToast } from '@fjlaubscher/matter';
import { FaSave } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

// components
import BackButton from '../../components/button/back';
import Layout from '../../components/layout';
import UnitListCard from '../../components/unit/list-card';
import UnitBuilder from '../../components/unit/builder';

// hooks
import { useArmy } from '../../hooks/army';
import { useList } from '../../hooks/list';

// helpers
import { calculateCost } from '../../helpers/unit';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const AddListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key } = useParams();

  const { type, role, unit } = useRecoilValue(UnitBuilderAtom);

  const { data: list, persist: setList, loading: loadingList } = useList(key);
  const { units, loading: loadingArmy } = useArmy(list?.army);

  const handleSubmit = useCallback(async () => {
    if (!list || !unit) {
      return undefined;
    }

    const newUnit: Barracks.List.Unit = {
      ...unit,
      key: `${type}-${role}-${list.units[type][role].length + 1}`,
      points: calculateCost(unit)
    };

    await setList({
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
  }, [list, type, role, navigate, unit]);

  if (!type && !role) {
    return <Navigate to={`/list/${key}/edit`} />;
  }

  return (
    <Layout
      title="Add Unit"
      isLoading={loadingArmy || loadingList}
      action={
        <IconButton disabled={!unit} onClick={handleSubmit}>
          <FaSave />
        </IconButton>
      }
    >
      <Stack direction="column">
        <BackButton to={`/list/${key}/edit`} />
        {unit && <UnitListCard listUnit={unit} />}
        {list && units && <UnitBuilder units={units[type][role]} />}
      </Stack>
    </Layout>
  );
};

export default AddListUnit;
