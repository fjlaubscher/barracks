import { useCallback } from 'react';
import { MdVisibility } from 'react-icons/md';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { IconButton, useToast } from '@fjlaubscher/matter';
import { useSetRecoilState } from 'recoil';

// components
import ListLayout from '../../components/ListLayout';
import Section from '../../components/Section';
import UnitCard from '../../components/UnitCard';

// hooks
import { useList } from '../../hooks/use-list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditList = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();
  const setUnitBuilderPayload = useSetRecoilState(UnitBuilderAtom);

  const { data: list, loading: loadingList, persist: setList, isOwner } = useList(key);

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

        toast({ text: `${listUnit.unit.name} duplicated.`, variant: 'success' });
      }
    },
    [list, setList, toast]
  );

  const handleListUnitDelete = useCallback(
    async (type: string, role: string, listUnit: Barracks.List.Unit, index: number) => {
      if (list) {
        await setList({
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
    [list, setList, toast]
  );

  if (!loadingList && list && !isOwner) {
    return <Navigate to={`/list/${list.key}`} />;
  }

  const listUnits = list ? list.units : {};

  return (
    <ListLayout
      action={
        <IconButton onClick={() => navigate(`/list/${key}`)}>
          <MdVisibility />
        </IconButton>
      }
      list={list}
    >
      {Object.keys(listUnits).map((type) => (
        <div key={`unit-type-${type}`}>
          {Object.keys(listUnits[type]).map((role, i) => (
            <Section
              key={`${type}-role-${i}`}
              title={type}
              description={role}
              onAddClick={() => {
                handleListUnitAdd(type, role);
              }}
            >
              {listUnits[type][role].map((unit, i) => (
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
    </ListLayout>
  );
};

export default EditList;
