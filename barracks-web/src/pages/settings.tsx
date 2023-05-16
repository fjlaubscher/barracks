import { useLocalStorage, useToast, IconButton, Alert, Button } from '@fjlaubscher/matter';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

// components
import SettingsForm from '../components/settings/form';
import Layout from '../components/layout';

// helpers
import { DEFAULT_SETTINGS, overrideStyles } from '../data/settings';
import { SETTINGS } from '../data/storage';

const Settings = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [settings, setSettings] = useLocalStorage<Barracks.Settings>(SETTINGS);

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
      overrideStyles({ primaryColor: values.primaryColor, accentColor: values.accentColor });

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
            variant="accent"
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
