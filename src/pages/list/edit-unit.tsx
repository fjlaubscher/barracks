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

// helpers
import useList from '../../helpers/use-list';
import useArmy from '../../helpers/use-army';
import { calculateCost } from '../../helpers/unit';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key } = useParams();

  const { type, role, unit } = useRecoilValue(UnitBuilderAtom);

  const [list, setList] = useList(key!);
  const { units, loading } = useArmy(list?.army || '');

  const handleSubmit = useCallback(() => {
    if (!list || !unit) {
      return undefined;
    }

    const otherUnits = list.units[type][role].filter((u) => u.key !== unit.key);
    const newUnit: Barracks.List.Unit = {
      ...unit,
      points: calculateCost(unit)
    };

    setList({
      ...list,
      points: list.points + newUnit.points,
      units: {
        ...list.units,
        [type]: {
          ...list.units[type],
          [role]: [newUnit, ...otherUnits]
        }
      }
    });
    toast({ text: `${newUnit.unit.name} updated.`, variant: 'success' });
    navigate(`/list/${key}/edit`);
  }, [list, type, role, navigate, unit]);

  if (!type && !role) {
    return <Navigate to={`/list/${key}/edit`} />;
  }

  return (
    <Layout
      title="Edit Unit"
      isLoading={loading}
      action={
        <IconButton variant="info" onClick={handleSubmit}>
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

export default EditListUnit;
