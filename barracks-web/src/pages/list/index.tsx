import { useCallback, useMemo } from 'react';
import { FaClone, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Stat, IconButton, Stack, useToast, Button, useLocalStorage } from '@fjlaubscher/matter';

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
import useArmy from '../../helpers/use-army';
import useAsync from '../../helpers/use-async';
import useCore from '../../helpers/use-core';
import useList from '../../helpers/use-list';
import { formatDate } from '../../helpers/date';
import {
  buildTextList,
  calculateOrderDice,
  shareListImage,
  createPublicList,
  deletePublicList
} from '../../helpers/list';
import { DEFAULT_SETTINGS } from '../../helpers/settings';
import { SETTINGS } from '../../helpers/storage';

import styles from './list.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const [settings] = useLocalStorage<Barracks.Settings>(SETTINGS);
  const { data, loading: loadingCore } = useCore();
  const [list, setList] = useList(key!);
  const { army, loading: loadingArmy } = useArmy(list?.army);

  const totalOrderDice = useMemo(() => (list ? calculateOrderDice(list) : 0), [list]);

  const handleCopyList = useCallback(async () => {
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
    if (list) {
      const publicUrl = await createPublicList({
        createdBy: settings?.username || DEFAULT_SETTINGS.username,
        createdDate: list.created,
        slug: list.key,
        list
      });
      if (publicUrl) {
        setList({ ...list, public: true });
        await navigator.clipboard.writeText(publicUrl);

        toast({
          text: 'Public link copied to clipboard.',
          variant: 'success'
        });
      }
    }
  }, [toast, list, setList, settings]);

  const handlePublicDelete = useCallback(async () => {
    if (list) {
      const isPrivate = await deletePublicList(list.key);
      if (isPrivate) {
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
  }, [toast, list, setList]);

  const handleImageShare = useCallback(async () => {
    if (list) {
      const result = await shareListImage(list);
      if (result.success) {
        toast({
          text: 'List shared.',
          variant: 'success'
        });
      } else {
        toast({ text: 'Unable to share list.', variant: 'error' });
      }
    }
  }, [list, totalOrderDice]);

  const { execute: sharePublicLink } = useAsync(handlePublicShare, false);
  const { execute: deletePublicLink } = useAsync(handlePublicDelete, false);

  return (
    <Layout
      title="List"
      action={
        <IconButton onClick={() => navigate(`/list/${key}/edit`)}>
          <FaEdit />
        </IconButton>
      }
      isLoading={loadingCore || loadingArmy}
      onShareClick={handleImageShare}
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
          <div className={styles.actions}>
            <Button className={styles.button} leftIcon={<FaClone />} onClick={handleCopyList}>
              Copy to clipboard
            </Button>
            <Toggle
              className={styles.toggle}
              label={list.public ? 'Public' : 'Private'}
              defaultChecked={list.public}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  sharePublicLink();
                } else {
                  deletePublicLink();
                }
              }}
            />
          </div>
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
