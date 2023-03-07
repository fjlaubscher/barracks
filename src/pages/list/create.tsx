import { useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { useToast, IconButton } from '@fjlaubscher/matter';
import { FormProvider, useForm } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';

// components
import Layout from '../../components/layout';
import ListForm, { FormValues as ListFormValues } from '../../components/list/form';

// helpers
import { ARMIES, LISTS } from '../../helpers/storage';
import { LIST_UNITS_TEMPLATE } from '../../helpers/data';

const CreateList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [armies] = useLocalStorage<Barracks.Armies>(ARMIES);
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);

  const form = useForm<ListFormValues>({ mode: 'onChange', defaultValues: { limit: 1000 } });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    (values: Omit<ListFormValues, 'armyId'>) => {
      const totalListsForArmy = lists?.filter((l) => l.army === values.army).length || 0;
      const newList: Barracks.List = {
        ...values,
        key: `${values.army}-${totalListsForArmy + 1}`,
        created: new Date().toISOString(),
        points: 0,
        units: LIST_UNITS_TEMPLATE
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
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="list-form"
            variant="info"
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
