import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@fjlaubscher/matter';
import { useRecoilValue } from 'recoil';

// components
import ListLayout from '../../components/ListLayout';
import Section from '../../components/Section';
import UnitBuilder from '../../components/UnitBuilder';
import UnitListCard from '../../components/UnitListCard';

// helpers
import { calculateCost } from '../../helpers/unit';

// hooks
import { useArmy } from '../../hooks/use-army';
import { useList } from '../../hooks/use-list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditListUnit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { key, index } = useParams();

  const { type, role, unit } = useRecoilValue(UnitBuilderAtom);
  const { data: list, persist: setList } = useList(key);
  const { army, units } = useArmy(list?.army);

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
    if (units && unit) {
      const unitIndex = units[type][role]
        .sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        })
        .findIndex((u) => u.name === unit.unit.name);
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
    <ListLayout list={list}>
      <Section
        title={type}
        description={role}
        onCloseClick={() => navigate(`/list/${key}/edit`)}
        onSaveClick={handleSubmit}
      >
        {unit && <UnitListCard army={army} listUnit={unit} />}
        {list && units && (
          <UnitBuilder units={units[type][role]} initialValues={builderInitialValues} />
        )}
      </Section>
    </ListLayout>
  );
};

export default EditListUnit;
