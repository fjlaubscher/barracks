import { useToast, IconButton } from '@fjlaubscher/matter';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import { useLocalStorage } from 'usehooks-ts';
import EasySpeech from 'easy-speech';

// components
import SettingsForm from '../components/settings/form';
import Layout from '../components/layout';

// helpers
import { DEFAULT_SETTINGS } from '../data/settings';
import { SETTINGS } from '../data/storage';

// hooks
import { useArmies } from '../hooks/army';

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

  const voiceOptions = useMemo(() => {
    const voices: SpeechSynthesisVoice[] = EasySpeech.voices();
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

    return options;
  }, []);

  return (
    <FormProvider {...form}>
      <Layout
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
        {armies && <SettingsForm armies={armies} voices={voiceOptions} onSubmit={handleSubmit} />}
      </Layout>
    </FormProvider>
  );
};

export default Settings;
