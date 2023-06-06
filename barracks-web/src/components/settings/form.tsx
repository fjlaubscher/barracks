import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, SelectField } from '@fjlaubscher/matter';

// components
import Section from '../section';

// helpers
import { speakText } from '../../helpers/speech-synthesis';

import styles from './settings.module.scss';

interface Props {
  voices: matter.Option[];
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ voices, onSubmit }: Props) => {
  const { handleSubmit, control } = useFormContext<Barracks.Settings>();
  const { field: voiceField } = useController({ name: 'voice', control });

  const handleVoiceChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const index = parseInt(e.currentTarget.value);
      voiceField.onChange(index);
      speakText('Barracks is a free and open-source Bolt Action assistant app.', index);
    },
    [voiceField]
  );

  return (
    <Form className={styles.form} id="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Section title="Settings" description="Theme">
        <SelectField
          label="Speech To Text: Voice"
          name="voice"
          options={voices}
          value={voiceField.value}
          onChange={handleVoiceChange}
          required
        />
      </Section>
    </Form>
  );
};

export default SettingsForm;
