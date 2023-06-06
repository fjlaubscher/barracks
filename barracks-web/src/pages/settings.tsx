import { useToast, IconButton } from '@fjlaubscher/matter';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';

// components
import SettingsForm from '../components/settings/form';
import Layout from '../components/layout';

// helpers
import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS, TTS_READY } from '../data/storage';

const Settings = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const isTTSReady = useReadLocalStorage<boolean>(TTS_READY);
  const [settings, setSettings] = useLocalStorage<Barracks.Settings | undefined>(
    SETTINGS,
    undefined
  );
  const [voiceOptions, setVoiceOptions] = useState<matter.Option[]>([]);

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

  const handleOnVoicesReady = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    const options: matter.Option[] = [];

    for (let i = 0; i < voices.length; i++) {
      // do this specifically in a for loop to not lose track of the index
      if (voices[i].lang.includes('en')) {
        options.push({
          value: i,
          description: `${voices[i].localService ? '(Local)' : '(Remote)'} ${voices[i].name}`
        });
      }
    }

    setVoiceOptions(options);
  }, [setVoiceOptions]);

  useEffect(() => {
    handleOnVoicesReady();
  }, [isTTSReady]);

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
        isLoading={isTTSReady !== true}
      >
        <SettingsForm voices={voiceOptions} onSubmit={handleSubmit} />
      </Layout>
    </FormProvider>
  );
};

export default Settings;
