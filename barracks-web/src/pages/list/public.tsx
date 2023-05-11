import { useCallback, useMemo } from 'react';
import { FaDownload } from 'react-icons/fa';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Stat, Stack, useToast, Button, useLocalStorage, useAsync } from '@fjlaubscher/matter';

// components
import Layout from '../../components/layout';
import ListUnitCard from '../../components/unit/list-card';
import Stats from '../../components/stats';
import Section from '../../components/section';

// helpers
import useArmy from '../../data/use-army';
import useCore from '../../data/use-core';
import { LISTS } from '../../data/storage';
import { formatDate } from '../../helpers/date';
import { calculateOrderDice, getPublicList } from '../../helpers/list';

import styles from './list.module.scss';

const PublicList = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const { status: listStatus, value: publicList } = useAsync(() => getPublicList(key!), [key]);
  const { army, loading: loadingArmy } = useArmy(publicList?.list.army);
  const { data, loading: loadingCore } = useCore();
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

  const handleImport = useCallback(() => {
    if (publicList) {
      if (lists) {
        const otherLists = lists.filter((l) => l.key !== publicList.slug);
        setLists([publicList.list, ...otherLists]);
      } else {
        setLists([publicList.list]);
      }

      toast({
        text: 'List imported.',
        variant: 'success'
      });

      navigate(`/list/${publicList.slug}`);
    }
  }, [publicList, lists, setLists, toast, navigate]);

  const totalOrderDice = useMemo(
    () => (publicList ? calculateOrderDice(publicList?.list) : 0),
    [publicList]
  );

  const isListImported = useMemo(() => {
    if (publicList && lists) {
      const list = lists.filter((l) => l.key === publicList.slug)[0];
      return !!list;
    }

    return false;
  }, [publicList, lists]);

  if (listStatus === 'success' && !publicList) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout title="List" isLoading={loadingCore || loadingArmy || listStatus === 'pending'}>
      {army && data && publicList && (
        <>
          <Stack direction="row">
            <Stats>
              <Stat
                title={army.name}
                value={publicList.list.name}
                description={`@${publicList.createdBy} - ${formatDate(publicList.createdDate)}`}
              />
              <Stat
                title="Points"
                value={`${publicList.list.points}/${publicList.list.limit}`}
                description={`Order Dice: ${totalOrderDice}`}
              />
            </Stats>
          </Stack>
          <Button
            leftIcon={<FaDownload />}
            className={styles.copyButton}
            onClick={handleImport}
            disabled={isListImported}
          >
            Import list
          </Button>
          {Object.keys(publicList.list.units).map((type) => (
            <div key={`unit-type-${type}`}>
              {Object.keys(publicList.list.units[type]).map((role, i) =>
                publicList.list.units[type][role].length > 0 ? (
                  <Section key={`${type}-role-${i}`} title={type} description={role}>
                    {publicList.list.units[type][role].map((unit, i) => (
                      <ListUnitCard key={`list-unit-${i}`} listUnit={unit} />
                    ))}
                  </Section>
                ) : undefined
              )}
            </div>
          ))}
        </>
      )}
    </Layout>
  );
};

export default PublicList;
