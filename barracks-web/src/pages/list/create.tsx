import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast, IconButton, useLocalStorage } from '@fjlaubscher/matter';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import ListForm, { FormValues as ListFormValues } from '../../components/list/form';

// helpers
import { ARMIES, USER } from '../../data/storage';
import { LIST_UNITS_TEMPLATE } from '../../helpers/data';
import useList from '../../data/use-list';

const CreateList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);
  const [user] = useLocalStorage<Barracks.User>(USER);
  const { createOrUpdate } = useList();

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
    defaultValues: { limit: 1000, armyId: armyId, army, notes: '' }
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    async (values: Omit<ListFormValues, 'armyId'>) => {
      const newList: Barracks.List = {
        ...values,
        key: crypto.randomUUID(),
        created: new Date().toISOString(),
        points: 0,
        units: LIST_UNITS_TEMPLATE,
        public: !!user
      };

      await createOrUpdate(newList);
      toast({ text: 'List created.', variant: 'success' });
      navigate(`/list/${newList.key}/edit`);
    },
    [user, toast, navigate]
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
            variant="accent"
          >
            <FaSave />
          </IconButton>
        }
      >
        {armies && <ListForm armies={armies} onSubmit={handleSubmit} />}
      </Layout>
    </FormProvider>
  );
};

export default CreateList;
