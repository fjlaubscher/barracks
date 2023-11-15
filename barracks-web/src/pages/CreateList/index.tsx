import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Stack, useToast, IconButton, Stat, Alert } from '@fjlaubscher/matter';
import { FormProvider, useForm } from 'react-hook-form';
import { MdSave } from 'react-icons/md';
import { useReadLocalStorage } from 'usehooks-ts';

// components
import AppLayout from '../../components/AppLayout';
import ListForm, { FormValues as ListFormValues } from '../../components/ListForm';

// data
import { SETTINGS, USER } from '../../data/storage';

// hooks
import { useArmies } from '../../hooks/use-army';
import { useList } from '../../hooks/use-list';

// helpers
import { LIST_UNITS_TEMPLATE } from '../../helpers/data';

import styles from './CreateList.module.scss';

const CreateList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const listKey = useMemo(() => crypto.randomUUID(), []);

  const settings = useReadLocalStorage<Barracks.Settings | undefined>(SETTINGS);
  const user = useReadLocalStorage<Barracks.User | undefined>(USER);
  const { data: armies, loading: loadingArmies } = useArmies();
  const { persist: createList } = useList(listKey);
  const army = useMemo(
    () => search.get('army') ?? settings?.defaultArmy ?? undefined,
    [search, settings]
  );

  const form = useForm<ListFormValues>({
    mode: 'onChange',
    defaultValues: { limit: 1000, army, notes: '' }
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    async (values: ListFormValues) => {
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
      <AppLayout
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
          <Stat
            title="Barracks"
            value="New Army List"
            description="Did you know? Public army lists can be shared via link!"
          />
          {armies && <ListForm armies={armies} onSubmit={handleSubmit} isPublicAllowed={!!user} />}
        </Stack>
      </AppLayout>
    </FormProvider>
  );
};

export default CreateList;
