import { useCallback, useState, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconButton, Stack, Stat, useToast } from '@fjlaubscher/matter';

// components
import CreateBattleForm from '../../components/battle/create-form';
import type { FormValues as CreateBattleFormValues } from '../../components/battle/create-form';
import Layout from '../../components/layout';

// hooks
import { useBattle } from '../../hooks/battle';
import { useLists } from '../../hooks/list';
import { MdSave } from 'react-icons/md';

const CreateBattle = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const battleKey = useMemo(() => crypto.randomUUID(), []);
  const { persist: createBattle } = useBattle(battleKey);
  const { data: lists, loading: loadingLists } = useLists();
  const form = useForm<CreateBattleFormValues>({
    mode: 'onChange'
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    async (values: CreateBattleFormValues) => {
      const newBattle: Barracks.Battle = {
        ...values,
        key: battleKey,
        created: new Date().toISOString(),
        notes: '',
        playerScore: 0,
        opponentScore: 0
      };

      await createBattle(newBattle);
      toast({ text: 'Battle created.', variant: 'success' });

      if (newBattle.isAIOpponent) {
        navigate(`/battle/${battleKey}/ai`);
      } else {
        navigate(`/battle/${battleKey}/score`);
      }
    },
    [battleKey, createBattle, toast, navigate]
  );

  return (
    <FormProvider {...form}>
      <Layout
        title="Battle"
        description="Keep track of your battle with Barracks."
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="battle-form"
          >
            <MdSave />
          </IconButton>
        }
        isLoading={loadingLists}
      >
        <Stack direction="column">
          <Stat
            title="Barracks"
            value="New Battle"
            description="Did you know? You can play solo games with the experimental Barracks AI!"
          />
          {lists && <CreateBattleForm lists={lists} onSubmit={handleSubmit} />}
        </Stack>
      </Layout>
    </FormProvider>
  );
};

export default CreateBattle;
