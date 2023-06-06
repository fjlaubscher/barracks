import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, SelectField } from '@fjlaubscher/matter';

// components
import Section from '../section';

// helpers
import { speakText } from '../../helpers/speech-synthesis';

import styles from './settings.module.scss';

interface Props {
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ onSubmit }: Props) => {
  const { handleSubmit, control } = useFormContext<Barracks.Settings>();
  const [voiceOptions, setVoiceOptions] = useState<matter.Option[]>([]);

  const { field: voiceField } = useController({ name: 'voice', control });

  const handleVoiceChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const index = parseInt(e.currentTarget.value);
      voiceField.onChange(index);
      speakText('Barracks is a free and open-source Bolt Action assistant app.', index);
    },
    [voiceField]
  );

  const handleOnVoicesReady = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    const options = voices
      .filter((v) => v.lang === 'en-GB' || v.lang === 'en-US')
      .map((v, i) => ({ value: i, description: v.name } as matter.Option));

    setVoiceOptions(options);
  }, [setVoiceOptions]);

  useEffect(() => {
    if (speechSynthesis.onvoiceschanged) {
      speechSynthesis.onvoiceschanged = handleOnVoicesReady;
    } else {
      handleOnVoicesReady();
    }
  }, []);

  return (
    <Form className={styles.form} id="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Section title="Settings" description="Theme">
        <SelectField
          label="Speech To Text: Voice"
          name="voice"
          options={voiceOptions}
          value={voiceField.value}
          onChange={handleVoiceChange}
          required
        />
      </Section>
    </Form>
  );
};

export default SettingsForm;
