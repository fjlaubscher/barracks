import { useCallback } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { IconButton, useToast } from '@fjlaubscher/matter';
import { useSetRecoilState } from 'recoil';

// components
import ListLayout from '../../components/layout/list';
import Section from '../../components/section';
import UnitCard from '../../components/unit/card';

// data
import useArmy from '../../data/use-army';
import useList from '../../data/list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditList = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();
  const setUnitBuilderPayload = useSetRecoilState(UnitBuilderAtom);

  const { data: list, isLoading, createOrUpdate, isOwner } = useList(key);
  const { army, units } = useArmy(list?.army);

  const handleListUnitAdd = useCallback(
    (type: string, role: string) => {
      setUnitBuilderPayload({ type, role, unit: undefined });
      navigate(`/list/${key}/unit`);
    },
    [key, setUnitBuilderPayload, navigate]
  );

  const handleListUnitEdit = useCallback(
    (type: string, role: string, listUnit: Barracks.List.Unit, index: number) => {
      if (list) {
        setUnitBuilderPayload({ type, role, unit: { ...listUnit } });
        navigate(`/list/${key}/unit/${index}`);
      }
    },
    [list, navigate, setUnitBuilderPayload]
  );

  const handleListUnitCopy = useCallback(
    async (type: string, role: string, listUnit: Barracks.List.Unit) => {
      if (list) {
        const newUnit: Barracks.List.Unit = {
          ...listUnit,
          key: `${type}-${role}-${list.units[type][role].length + 1}`
        };

        await createOrUpdate({
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

        toast({ text: `${listUnit.unit.name} duplicated.`, variant: 'success' });
      }
    },
    [list, createOrUpdate, toast]
  );

  const handleListUnitDelete = useCallback(
    async (type: string, role: string, listUnit: Barracks.List.Unit, index: number) => {
      if (list) {
        await createOrUpdate({
          ...list,
          points: list.points - listUnit.points,
          units: {
            ...list.units,
            [type]: {
              ...list.units[type],
              [role]: list.units[type][role].filter((_, i) => i !== index)
            }
          }
        });

        toast({ text: `${listUnit.unit.name} deleted.`, variant: 'success' });
      }
    },
    [list, createOrUpdate, toast]
  );

  if (!isLoading && list && !isOwner) {
    return <Navigate to={`/list/${list.key}`} />;
  }

  return (
    <ListLayout
      action={
        <IconButton onClick={() => navigate(`/list/${key}`)}>
          <FaEye />
        </IconButton>
      }
      list={list}
    >
      {army && list && units && (
        <>
          {Object.keys(list.units).map((type) => (
            <div key={`unit-type-${type}`}>
              {Object.keys(list.units[type]).map((role, i) => (
                <Section
                  key={`${type}-role-${i}`}
                  title={type}
                  description={role}
                  onAddClick={() => {
                    if (units && units[type][role].length > 0) {
                      handleListUnitAdd(type, role);
                    }
                  }}
                >
                  {list.units[type][role].map((unit, i) => (
                    <UnitCard
                      key={`list-unit-${i}`}
                      listUnit={unit}
                      onClick={() => handleListUnitEdit(type, role, unit, i)}
                      onCopyClick={() => handleListUnitCopy(type, role, unit)}
                      onDeleteClick={() => handleListUnitDelete(type, role, unit, i)}
                    />
                  ))}
                </Section>
              ))}
            </div>
          ))}
        </>
      )}
    </ListLayout>
  );
};

export default EditList;
