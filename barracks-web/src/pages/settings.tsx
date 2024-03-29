import { useToast, IconButton } from '@fjlaubscher/matter';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import { useLocalStorage } from 'usehooks-ts';

// components
import AppLayout from '../components/AppLayout';
import SettingsForm from '../components/SettingsForm';

// helpers
import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

// hooks
import { useArmies } from '../hooks/use-army';

const Settings = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [settings, setSettings] = useLocalStorage<Barracks.Settings | undefined>(
    SETTINGS,
    undefined
  );
  const { data: armies, loading: loadingArmies } = useArmies();

  const form = useForm<Barracks.Settings>({
    mode: 'onChange',
    defaultValues: {
      ...DEFAULT_SETTINGS,
      ...settings
    }
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    (values: Barracks.Settings) => {
      setSettings({ ...values });

      toast({
        variant: 'success',
        text: 'Settings saved.'
      });
      navigate('/');
    },
    [setSettings, toast, navigate]
  );

  return (
    <FormProvider {...form}>
      <AppLayout
        title="Settings"
        isLoading={loadingArmies}
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="settings-form"
          >
            <MdSave />
          </IconButton>
        }
      >
        {armies && <SettingsForm armies={armies} onSubmit={handleSubmit} />}
      </AppLayout>
    </FormProvider>
  );
};

export default Settings;
