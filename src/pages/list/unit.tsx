import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast, IconButton } from '@fjlaubscher/matter';
import { FaSave } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import UnitForm from '../../components/unit/form';

// helpers
import useList from '../../helpers/use-list';
import useArmy from '../../helpers/use-army';
import { calculateCost } from '../../helpers/unit';

const AddListUnit = () => {
  const navigate = useNavigate();
  const { key, type, role } = useParams();
  const toast = useToast();
  const [list, setList] = useList(key!);
  const { units, loading } = useArmy(list?.army || '');

  const handleSubmit = useCallback(
    (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) => {
      if (!list || !type || !role) {
        return undefined;
      }

      const newUnit: Barracks.List.Unit = {
        ...listUnit,
        key: `${type}-${role}-${list.units[type][role].length + 1}`,
        points: calculateCost(listUnit)
      };

      setList({
        ...list,
        points: list.points + newUnit.points,
        units: {
          ...list.units,
          [type]: {
            ...list.units[type],
            [role]: [newUnit, ...list.units[type][role]]
          }
        }
      });
      toast({ text: 'Unit added.', variant: 'success' });
      navigate(`/list/${key}/edit`);
    },
    [list, type, role, toast, navigate]
  );

  return (
    <Layout title="Add Unit" isLoading={loading}>
      {list && units && <UnitForm onSubmit={handleSubmit} units={units[type!][role!]} />}
    </Layout>
  );
};

export default AddListUnit;
