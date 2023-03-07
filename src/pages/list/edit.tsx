import { useMemo, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, Card } from '@fjlaubscher/matter';
import { parseISO, format } from 'date-fns';

// components
import Layout from '../../components/layout';
import ListSection from '../../components/list/section';
import Stats from '../../components/stats';
import UnitCard from '../../components/unit/card';

// helpers
import useArmy from '../../helpers/use-army';
import useList from '../../helpers/use-list';

import styles from './list.module.scss';

const EditList = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useList(key!);
  const { army, units, loading } = useArmy(list?.army || '');

  const totalOrderDice = useMemo(() => {
    let orderDice = 0;

    if (list) {
      Object.keys(list.units).forEach((key) =>
        Object.keys(list.units[key]).forEach(
          (roleKey) => (orderDice += list.units[key][roleKey].length)
        )
      );
    }

    return orderDice;
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
                  onAddClick={() => navigate(`/list/${key}/unit/${type}/${role}`)}
                >
                  {list.units[type][role].map((unit, i) => (
                    <UnitCard key={`list-unit-${i}`} listUnit={unit} />
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
