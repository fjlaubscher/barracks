import { useLocalStorage, useToast, IconButton, Alert } from '@fjlaubscher/matter';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

// components
import SettingsForm from '../components/settings/form';
import Layout from '../components/layout';

// helpers
import { DEFAULT_SETTINGS, overrideStyles } from '../helpers/settings';
import { SETTINGS } from '../helpers/storage';

const Settings = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [settings, setSettings] = useLocalStorage<Barracks.Settings>(SETTINGS);

  const form = useForm<Barracks.Settings>({
    mode: 'onChange',
    defaultValues: settings || DEFAULT_SETTINGS
  });
  const { isValid, isSubmitting } = form.formState;

  const handleSubmit = useCallback(
    (values: Barracks.Settings) => {
      setSettings(values);
      overrideStyles(values);

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
        <Alert variant="info">
          Barracks is a free and open-source Bolt-Action assistant.
          <br />
          <br />
          Have any issues with the app?
          <a href="https://github.com/fjlaubscher/barracks/issues" target="_blank">
            https://github.com/fjlaubscher/barracks/issues
          </a>
        </Alert>
        <SettingsForm onSubmit={handleSubmit} />
      </Layout>
    </FormProvider>
  );
};

export default Settings;
