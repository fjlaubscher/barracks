import { useCallback, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconButton, SelectField, Stack, useToast } from '@fjlaubscher/matter';

// components
import ListLayout from '../../components/layout/list';
import ListUnitCard from '../../components/unit/list-card';
import Section from '../../components/section';
import Toggle from '../../components/toggle';

// hooks
import { useList } from '../../hooks/list';

import styles from './list.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const [displayMode, setDisplayMode] = useState<Barracks.List.DisplayMode>('verbose');
  const { data: list, persist: setList, isOwner, loading: loadingList } = useList(key);

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
          <FaEdit />
        </IconButton>
      }
      list={list}
      showRules
    >
      <Stack direction="row" className={styles.actions}>
        <SelectField
          label="Display Mode"
          options={[
            { value: 'standard', description: 'Standard' },
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
                    <ListUnitCard
                      key={`list-unit-${i}`}
                      listUnit={unit}
                      displayMode={displayMode}
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
