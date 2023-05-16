import { useCallback, useMemo } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, useToast, useLocalStorage, useAsync } from '@fjlaubscher/matter';

// components
import Card from '../../components/card';
import Damage from '../../components/rules/damage';
import Hit from '../../components/rules/hit';
import Layout from '../../components/layout';
import ListUnitCard from '../../components/unit/list-card';
import Stats from '../../components/stats';
import Section from '../../components/section';
import Toggle from '../../components/toggle';
import Weapons from '../../components/rules/weapons';

// helpers
import useArmy from '../../data/use-army';
import useCore from '../../data/use-core';
import useList from '../../data/use-list';
import { SETTINGS, USER } from '../../data/storage';
import { formatDate } from '../../helpers/date';
import {
  buildTextList,
  calculateOrderDice,
  createPublicList,
  deletePublicList
} from '../../helpers/list';

import styles from './list.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const [settings] = useLocalStorage<Barracks.Settings>(SETTINGS);
  const [user] = useLocalStorage<Barracks.User>(USER);
  const { data, loading: loadingCore } = useCore();
  const [list, setList] = useList(key!);
  const { army, loading: loadingArmy } = useArmy(list?.army);

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

  const handlePublicShare = useCallback(async () => {
    if (user && list) {
      const publicList = await createPublicList({
        createdBy: user?.id || `barracks-user-${crypto.randomUUID()}`,
        createdDate: list.created,
        slug: list.key,
        list: {
          ...list,
          public: true
        }
      });
      if (publicList) {
        setList({ ...list, public: true });
        toast({
          text: 'List made public.',
          variant: 'success'
        });
      }
    }
  }, [user, toast, list, setList, settings]);

  const handleRemovePublicList = useCallback(async () => {
    if (list) {
      const result = await deletePublicList(list.key);
      if (result) {
        setList({
          ...list,
          public: false
        });
        toast({
          text: 'List made private.',
          variant: 'success'
        });
      }
    }
  }, [toast, list, setList, settings]);

  const { execute: sharePublicLink } = useAsync(handlePublicShare, [], false);
  const { execute: removePublicLink } = useAsync(handleRemovePublicList, [], false);

  return (
    <Layout
      title="List"
      action={
        <IconButton onClick={() => navigate(`/list/${key}/edit`)}>
          <FaEdit />
        </IconButton>
      }
      isLoading={loadingCore || loadingArmy}
      onShareClick={handleShareList}
    >
      {army && data && list && (
        <>
          <Stack direction="row">
            <Stats>
              <Stat
                title={army.name}
                value={list.name}
                description={`${formatDate(list.created)}`}
              />
              <Stat
                title="Points"
                value={`${list.points}/${list.limit}`}
                description={`Order Dice: ${totalOrderDice}`}
              />
            </Stats>
          </Stack>
          {user && (
            <Stack direction="column" className={styles.actions}>
              <Toggle
                className={styles.toggle}
                label={list.public ? 'Public' : 'Private'}
                defaultChecked={list.public}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    sharePublicLink();
                  } else {
                    removePublicLink();
                  }
                }}
              />
            </Stack>
          )}
          {Object.keys(list.units).map((type) => (
            <div key={`unit-type-${type}`}>
              {Object.keys(list.units[type]).map((role, i) =>
                list.units[type][role].length > 0 ? (
                  <Section key={`${type}-role-${i}`} title={type} description={role}>
                    {list.units[type][role].map((unit, i) => (
                      <ListUnitCard key={`list-unit-${i}`} listUnit={unit} />
                    ))}
                  </Section>
                ) : undefined
              )}
            </div>
          ))}
          <Stack className={styles.rules} direction="column">
            <Section id="army-rules" title="Rules" description={army.name}>
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  <p>{rule.description}</p>
                </Card>
              ))}
            </Section>
            <Section id="army-rules" title="Rules" description="Damage Value">
              <Damage damage={data.damage} />
            </Section>
            <Section id="army-rules" title="Rules" description="Hit Modifiers">
              <Hit hits={data.hit} />
            </Section>
            <Section id="army-rules" title="Rules" description="Weapons">
              <Weapons weapons={data.weapons} />
            </Section>
          </Stack>
        </>
      )}
    </Layout>
  );
};

export default List;
