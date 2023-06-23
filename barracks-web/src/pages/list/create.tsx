import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Alert, Stack, useToast, IconButton } from '@fjlaubscher/matter';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { useReadLocalStorage } from 'usehooks-ts';

// components
import Layout from '../../components/layout';
import ListForm, { FormValues as ListFormValues } from '../../components/list/form';

// data
import { SETTINGS, USER } from '../../data/storage';

// hooks
import { useArmies } from '../../hooks/army';
import { useList } from '../../hooks/list';

// helpers
import { LIST_UNITS_TEMPLATE } from '../../helpers/data';

import styles from './list.module.scss';

const CreateList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const listKey = useMemo(() => crypto.randomUUID(), []);

  const settings = useReadLocalStorage<Barracks.Settings | undefined>(SETTINGS);
  const user = useReadLocalStorage<Barracks.User | undefined>(USER);
  const { data: armies, loading: loadingArmies } = useArmies();
  const { persist: createList } = useList(listKey);

  const armyKeys = useMemo(
    () => (armies ? Object.keys(armies).filter((k) => k !== 'lastUpdated') : []),
    [armies]
  );
  const army = useMemo(() => search.get('army') ?? undefined, [search]);

  const armyId = useMemo(() => {
    if (army) {
      return armyKeys.indexOf(army);
    }

    return undefined;
  }, [army, armyKeys]);

  const form = useForm<ListFormValues>({
    mode: 'onChange',
    defaultValues: { limit: 1000, armyId: settings?.defaultArmy ?? armyId, army, notes: '' }
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    async ({ armyId, ...values }: ListFormValues) => {
      const newList: Barracks.List = {
        ...values,
        key: listKey,
        created: new Date().toISOString(),
        points: 0,
        units: LIST_UNITS_TEMPLATE
      };

      await createList(newList);
      toast({ text: 'List created.', variant: 'success' });
      navigate(`/list/${listKey}/edit`);
    },
    [listKey, createList, toast, navigate]
  );

  return (
    <FormProvider {...form}>
      <Layout
        title="Army List"
        description="Create a new army list with Barracks."
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="list-form"
          >
            <MdSave />
          </IconButton>
        }
        isLoading={loadingArmies}
      >
        <Stack className={styles.create} direction="column">
          <Alert className={styles.alert} variant="info">
            When you share a public army list via link, anyone can view it!
          </Alert>
          {armies && <ListForm armies={armies} onSubmit={handleSubmit} isPublicAllowed={!!user} />}
        </Stack>
      </Layout>
    </FormProvider>
  );
};

export default CreateList;
