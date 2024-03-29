import { useCallback } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Alert, useToast } from '@fjlaubscher/matter';
import { useRecoilValue } from 'recoil';

// components
import ListLayout from '../../components/ListLayout';
import Section from '../../components/Section';
import UnitBuilder from '../../components/UnitBuilder';
import UnitListCard from '../../components/UnitListCard';

// hooks
import { useArmy } from '../../hooks/use-army';
import { useList } from '../../hooks/use-list';

// helpers
import { calculateCost } from '../../helpers/unit';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const CreateListUnit = () => {
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

  const hasUnitsForTypeRole = units ? units[type][role].length > 0 : false;

  return (
    <ListLayout list={list}>
      <Section
        title={type}
        description={role}
        onCloseClick={() => navigate(`/list/${key}/edit`)}
        onSaveClick={handleSubmit}
      >
        {unit && <UnitListCard army={army} listUnit={unit} />}
        {hasUnitsForTypeRole ? (
          <UnitBuilder units={units ? units[type][role] : []} />
        ) : (
          <Alert variant="warning">There are no {role} units</Alert>
        )}
      </Section>
    </ListLayout>
  );
};

export default CreateListUnit;
