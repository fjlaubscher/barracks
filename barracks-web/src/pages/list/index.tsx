import { useCallback, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IconButton, SelectField, Stack, useToast } from '@fjlaubscher/matter';

// components
import ListLayout from '../../components/layout/list';
import ListUnitCard from '../../components/unit/list-card';
import Section from '../../components/section';
import Toggle from '../../components/toggle';

// data
import useList from '../../data/use-list';

import styles from './list.module.scss';

const List = () => {
  const toast = useToast();
  const { key } = useParams();
  const navigate = useNavigate();

  const [displayMode, setDisplayMode] = useState<Barracks.List.DisplayMode>('standard');
  const { data, createOrUpdate, isOwner, isLoading } = useList(key);

  const handleListVisibility = useCallback(
    async (mode: 'private' | 'public') => {
      if (data) {
        await createOrUpdate({
          ...data,
          public: mode === 'public'
        });
        toast({
          text: `List made ${mode}.`,
          variant: 'success'
        });
      }
    },
    [toast, data, createOrUpdate]
  );

  if (!isLoading && data?.public === false && !isOwner) {
    return <Navigate to="/404" />;
  }

  return (
    <ListLayout
      action={
        <IconButton disabled={!data} onClick={() => navigate(`/list/${key}/edit`)}>
          <FaEdit />
        </IconButton>
      }
      list={data}
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
            label={data?.public ? 'Public' : 'Private'}
            defaultChecked={data?.public}
            onChange={(e) => handleListVisibility(e.currentTarget.checked ? 'public' : 'private')}
          />
        )}
      </Stack>
      {data &&
        Object.keys(data.units).map((type) => (
          <div key={`unit-type-${type}`}>
            {Object.keys(data.units[type]).map((role, i) =>
              data.units[type][role].length > 0 ? (
                <Section key={`${type}-role-${i}`} title={type} description={role}>
                  {data.units[type][role].map((unit, i) => (
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
