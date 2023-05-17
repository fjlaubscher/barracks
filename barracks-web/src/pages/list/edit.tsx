import { useCallback, useEffect, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, useToast, useLocalStorage, useAsync } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';
import { useSetRecoilState } from 'recoil';

// components
import Layout from '../../components/layout';
import Section from '../../components/section';
import Stats from '../../components/stats';
import UnitCard from '../../components/unit/card';

// helpers
import useArmy from '../../data/use-army';
import useList from '../../data/use-list';
import { USER } from '../../data/storage';
import { buildTextList, calculateOrderDice } from '../../helpers/list';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';
import { createPublicList } from '../../data/use-public-list';

const EditList = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();
  const setUnitBuilderPayload = useSetRecoilState(UnitBuilderAtom);

  const [user] = useLocalStorage<Barracks.User>(USER);
  const [list, setList] = useList(key!);
  const { army, units, loading } = useArmy(list!.army);

  const totalOrderDice = useMemo(() => (list ? calculateOrderDice(list) : 0), [list]);

  const handleShareList = useCallback(async () => {
    if (list) {
      const text = buildTextList(list);
      await navigator.clipboard.writeText(text);

      toast({
        text: 'List copied to clipboard.',
        variant: 'success'
      });
    }
  }, [toast, list]);

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
    (type: string, role: string, listUnit: Barracks.List.Unit, index: number) => {
      if (list) {
        setList({
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

  const { execute: syncPublicList } = useAsync(
    async (list: Barracks.List) => {
      if (user) {
        await createPublicList({
          createdBy: user.id,
          slug: list.key,
          createdDate: list.created,
          list
        });
      }
    },
    [user],
    false
  );

  useEffect(() => {
    if (list && list.public) {
      syncPublicList(list);
    }
  }, [list]);

  return (
    <Layout
      title="List"
      action={
        <IconButton onClick={() => navigate(`/list/${key}`)}>
          <FaEye />
        </IconButton>
      }
      isLoading={loading}
      onShareClick={handleShareList}
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
    </Layout>
  );
};

export default EditList;
