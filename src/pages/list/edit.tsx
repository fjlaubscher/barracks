import { useCallback, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';
import { useSetRecoilState } from 'recoil';

// components
import Layout from '../../components/layout';
import ListSection from '../../components/list/section';
import Stats from '../../components/stats';
import UnitCard from '../../components/unit/card';

// helpers
import useArmy from '../../helpers/use-army';
import useList from '../../helpers/use-list';

// state
import { CreateListUnitAtom } from '../../state/list';

const EditList = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const setCreateListUnit = useSetRecoilState(CreateListUnitAtom);

  const [list, setList] = useList(key!);
  const { army, units, loading } = useArmy(list?.army || '');

  const totalOrderDice = useMemo(() => {
    let orderDice = 0;

    if (list) {
      Object.keys(list.units).forEach((type) =>
        Object.keys(list.units[type]).forEach(
          (role) => (orderDice += list.units[type][role].length)
        )
      );
    }

    return orderDice;
  }, [list]);

  const handleAddListUnit = useCallback(
    (type: string, role: string) => {
      setCreateListUnit({ type, role });
      navigate(`/list/${key}/unit`);
    },
    [key, setCreateListUnit, navigate]
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
      }
    },
    [list, setList]
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
                <ListSection
                  key={`${type}-role-${i}`}
                  title={type}
                  description={role}
                  onAddClick={() => {
                    if (units[type][role].length > 0) {
                      handleAddListUnit(type, role);
                    }
                  }}
                >
                  {list.units[type][role].map((unit, i) => (
                    <UnitCard
                      key={`list-unit-${i}`}
                      listUnit={unit}
                      onDeleteClick={() => handleListUnitDelete(type, role, unit)}
                    />
                  ))}
                </ListSection>
              ))}
            </div>
          ))}
        </>
      )}
    </Layout>
  );
};

export default EditList;
