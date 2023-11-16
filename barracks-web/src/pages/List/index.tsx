import { useCallback, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, SelectField, Stack, useToast } from '@fjlaubscher/matter';
import { useReadLocalStorage } from 'usehooks-ts';

// components
import ListLayout from '../../components/ListLayout';
import UnitListCard from '../../components/UnitListCard';
import Section from '../../components/Section';
import Toggle from '../../components/Toggle';

// data
import { SETTINGS } from '../../data/storage';

// hooks
import { useArmy } from '../../hooks/use-army';
import { useList } from '../../hooks/use-list';

import styles from './List.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const settings = useReadLocalStorage<Barracks.Settings | undefined>(SETTINGS);
  const [displayMode, setDisplayMode] = useState<Barracks.List.DisplayMode>(
    settings?.listDisplayMode || 'verbose'
  );
  const { data: list, persist: setList, isOwner, loading: loadingList } = useList(key);
  const { army } = useArmy(list?.army);

  const handleListVisibility = useCallback(
    async (mode: 'private' | 'public') => {
      if (list) {
        await setList({
          ...list,
          public: mode === 'public'
        });
        toast({
          text: `List made ${mode}.`,
          variant: 'success'
        });
      }
    },
    [toast, list, setList]
  );

  if (!loadingList && list?.public === false && !isOwner) {
    return null;
  }

  return (
    <ListLayout
      action={
        <IconButton disabled={!list} onClick={() => navigate(`/list/${key}/edit`)}>
          <MdEdit />
        </IconButton>
      }
      list={list}
      showRules
      showWeapons={displayMode === 'minimal'}
    >
      <Stack direction="row" className={styles.actions}>
        <SelectField
          label="Display Mode"
          options={[
            { value: 'minimal', description: 'Minimal' },
            { value: 'verbose', description: 'Detailed' }
          ]}
          value={displayMode}
          onChange={(e) => setDisplayMode(e.currentTarget.value as Barracks.List.DisplayMode)}
          required
        />
        {isOwner && (
          <Toggle
            className={styles.toggle}
            label={list?.public ? 'Public' : 'Private'}
            defaultChecked={list?.public}
            onChange={(e) => handleListVisibility(e.currentTarget.checked ? 'public' : 'private')}
          />
        )}
      </Stack>
      {list &&
        Object.keys(list.units).map((type) => (
          <div key={`unit-type-${type}`}>
            {Object.keys(list.units[type]).map((role, i) =>
              list.units[type][role].length > 0 ? (
                <Section key={`${type}-role-${i}`} title={type} description={role}>
                  {list.units[type][role].map((unit, i) => (
                    <UnitListCard
                      key={`list-unit-${i}`}
                      army={army}
                      listUnit={unit}
                      displayMode={displayMode}
                      showWeapons={displayMode === 'verbose'}
                    />
                  ))}
                </Section>
              ) : undefined
            )}
          </div>
        ))}
    </ListLayout>
  );
};

export default List;
