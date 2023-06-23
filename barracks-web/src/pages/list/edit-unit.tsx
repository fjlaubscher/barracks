import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, useToast } from '@fjlaubscher/matter';
import { MdSave } from 'react-icons/md';
import { useRecoilValue } from 'recoil';

// components
import ListLayout from '../../components/layout/list';
import Section from '../../components/section';
import UnitListCard from '../../components/unit/list-card';
import UnitBuilder from '../../components/unit/builder';

// helpers
import { calculateCost } from '../../helpers/unit';

// hooks
import { useArmy } from '../../hooks/army';
import { useList } from '../../hooks/list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key, index } = useParams();

  const { type, role, unit } = useRecoilValue(UnitBuilderAtom);
  const { data: list, loading: loadingList, persist: setList } = useList(key);
  const { units } = useArmy(list?.army);

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

    await setList({
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
    return null;
  }

  return (
    <ListLayout
      list={list}
      action={
        <IconButton onClick={handleSubmit} loading={loadingList}>
          <MdSave />
        </IconButton>
      }
    >
      <Section title={type} description={role} onBackClick={() => navigate(`/list/${key}/edit`)}>
        {unit && <UnitListCard listUnit={unit} />}
        {list && units && (
          <UnitBuilder units={units[type][role]} initialValues={builderInitialValues} />
        )}
      </Section>
    </ListLayout>
  );
};

export default EditListUnit;
