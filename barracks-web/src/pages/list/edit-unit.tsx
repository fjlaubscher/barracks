import { useCallback, useMemo } from 'react';
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
import useList from '../../data/use-list';
import useArmy from '../../data/use-army';
import { calculateCost } from '../../helpers/unit';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key, index } = useParams();

  const { type, role, unit } = useRecoilValue(UnitBuilderAtom);

  const { data: list, isLoading, createOrUpdate } = useList(key);
  const { units, loading } = useArmy(list?.army);

  const handleSubmit = useCallback(async () => {
    if (!list || !unit || !index) {
      return undefined;
    }

    const parsedIndex = parseInt(index);
    const oldCost = calculateCost(list.units[type][role][parsedIndex]);
    const newCost = calculateCost(unit);
    const listPoints = list.points - oldCost;

    const newUnits: Barracks.List.Units = { ...list.units };
    newUnits[type][role][parsedIndex] = { ...unit, points: newCost };

    await createOrUpdate({
      ...list,
      points: listPoints + newCost,
      units: { ...newUnits }
    });
    toast({ text: `${unit.unit.name} updated.`, variant: 'success' });
    navigate(`/list/${key}/edit`);
  }, [list, type, role, navigate, unit, index]);

  const builderInitialValues = useMemo(() => {
    if (index && units && unit) {
      const unitIndex = units[type][role].findIndex((u) => u.name === unit.unit.name);
      const profileIndex = unit.unit.profiles.findIndex((p) => p.name === unit.profile.name);
      const veterancyIndex = Object.keys(unit.unit.profiles[profileIndex].cost).findIndex(
        (c) => c === unit.veterancy
      );
      const takenOptionNames = unit.options.map((o) => o.option.name);
      const options: { [index: number]: number } = unit.unit.options.reduce(
        (acc, option, index) => {
          const takenOptionIndex = takenOptionNames.indexOf(option.name);
          if (takenOptionIndex >= 0) {
            return {
              ...acc,
              [index]: unit.options[takenOptionIndex].amount
            };
          }

          return acc;
        },
        {}
      );

      return {
        unitIndex,
        profileIndex,
        veterancyIndex,
        options
      };
    }

    return undefined;
  }, [units, type, role, unit]);

  if (!type && !role) {
    return <Navigate to={`/list/${key}/edit`} />;
  }

  return (
    <Layout
      title="Edit Unit"
      isLoading={loading || isLoading}
      action={
        <IconButton variant="info" onClick={handleSubmit}>
          <FaSave />
        </IconButton>
      }
    >
      <Stack direction="column">
        <BackButton to={`/list/${key}/edit`} />
        {unit && <UnitListCard listUnit={unit} />}
        {list && units && (
          <UnitBuilder units={units[type][role]} initialValues={builderInitialValues} />
        )}
      </Stack>
    </Layout>
  );
};

export default EditListUnit;
