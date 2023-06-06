import { useToast, IconButton } from '@fjlaubscher/matter';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';

// components
import SettingsForm from '../components/settings/form';
import Layout from '../components/layout';

// helpers
import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

const Settings = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [settings, setSettings] = useLocalStorage<Barracks.Settings | undefined>(
    SETTINGS,
    undefined
  );

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
      <Layout
        title="Settings"
        action={
          <IconButton
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            form="settings-form"
          >
            <FaSave />
          </IconButton>
        }
      >
        <SettingsForm onSubmit={handleSubmit} />
      </Layout>
    </FormProvider>
  );
};

export default Settings;
