import { useCallback, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, useToast } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';
import { useSetRecoilState } from 'recoil';

// components
import Layout from '../../components/layout';
import Section from '../../components/section';
import Stats from '../../components/stats';
import UnitCard from '../../components/unit/card';

// helpers
import useArmy from '../../helpers/use-army';
import useList from '../../helpers/use-list';
import { calculateOrderDice } from '../../helpers/list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

const EditList = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();
  const setUnitBuilderPayload = useSetRecoilState(UnitBuilderAtom);

  const [list, setList] = useList(key!);
  const { army, units, loading } = useArmy(list!.army);

  const totalOrderDice = useMemo(() => (list ? calculateOrderDice(list) : 0), [list]);

  const handleListUnitAdd = useCallback(
    (type: string, role: string) => {
      setUnitBuilderPayload({ type, role, unit: undefined });
      navigate(`/list/${key}/unit`);
    },
    [key, setUnitBuilderPayload, navigate]
  );

  const handleListUnitEdit = useCallback(
    (type: string, role: string, index: number) => {
      if (list) {
        const unit = list.units[type][role][index];
        setUnitBuilderPayload({ type, role, unit });
        navigate(`/list/${key}/unit/${index}`);
      }
    },
    [list, navigate, setUnitBuilderPayload]
  );

  const handleListUnitCopy = useCallback(
    (type: string, role: string, listUnit: Barracks.List.Unit) => {
      if (list) {
        const newUnit: Barracks.List.Unit = {
          ...listUnit,
          key: `${type}-${role}-${list.units[type][role].length + 1}`
        };

        setList({
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
    (type: string, role: string, listUnit: Barracks.List.Unit) => {
      if (list) {
        setList({
          ...list,
          points: list.points - listUnit.points,
          units: {
            ...list.units,
            [type]: {
              ...list.units[type],
              [role]: list.units[type][role].filter((unit) => unit.key !== listUnit.key)
            }
          }
        });

        toast({ text: `${listUnit.unit.name} deleted.`, variant: 'success' });
      }
    },
    [list, setList, toast]
  );

  return (
    <Layout
      title="List"
      action={
        <IconButton onClick={() => navigate(`/list/${key}`)}>
          <FaEye />
        </IconButton>
      }
      isLoading={loading}
    >
      {army && list && units && (
        <>
          <Stack direction="row">
            <Stats>
              <Stat
                title={army.name}
                value={list.name}
                description={`Created on ${format(parseISO(list.created), 'yyyy-MM-dd')}`}
              />
              <Stat
                title="Points"
                value={`${list.points}/${list.limit}`}
                description={`${totalOrderDice} Order Dice`}
              />
            </Stats>
          </Stack>
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
                      onClick={() => handleListUnitEdit(type, role, i)}
                      onCopyClick={() => handleListUnitCopy(type, role, unit)}
                      onDeleteClick={() => handleListUnitDelete(type, role, unit)}
                    />
                  ))}
                </Section>
              ))}
            </div>
          ))}
        </>
      )}
    </Layout>
  );
};

export default EditList;
