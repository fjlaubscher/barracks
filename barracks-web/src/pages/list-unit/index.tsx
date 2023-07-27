import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@fjlaubscher/matter';
import { useRecoilValue } from 'recoil';

// components
import ListLayout from '../../components/layout/list';
import Section from '../../components/section';
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

  const { data: list, persist: setList } = useList(key);
  const { army, units } = useArmy(list?.army);

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
    <ListLayout list={list}>
      <Section
        title={type}
        description={role}
        onCloseClick={() => navigate(`/list/${key}/edit`)}
        onSaveClick={handleSubmit}
      >
        {unit && <UnitListCard army={army} listUnit={unit} />}
        {list && units && <UnitBuilder units={units[type][role]} />}
      </Section>
    </ListLayout>
  );
};

export default AddListUnit;
