import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast, IconButton, useLocalStorage } from '@fjlaubscher/matter';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import ListForm, { FormValues as ListFormValues } from '../../components/list/form';

// helpers
import { ARMIES, LISTS } from '../../helpers/storage';
import { LIST_UNITS_TEMPLATE } from '../../helpers/data';

const CreateList = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

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
    (values: Omit<ListFormValues, 'armyId'>) => {
      const newList: Barracks.List = {
        ...values,
        key: crypto.randomUUID(),
        created: new Date().toISOString(),
        points: 0,
        units: LIST_UNITS_TEMPLATE,
        public: false
      };

      setLists(lists ? [newList, ...lists] : [newList]);
      toast({ text: 'List created.', variant: 'success' });
      navigate(`/list/${newList.key}/edit`);
    },
    [lists, setLists, toast, navigate]
  );

  return (
    <FormProvider {...form}>
      <Layout
        title="New List"
        description="Create a new list with Barracks."
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
