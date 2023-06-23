import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, SelectField } from '@fjlaubscher/matter';

// components
import Section from '../section';

// helpers
import { speakText } from '../../helpers/speech-synthesis';

import styles from './settings.module.scss';

interface Props {
  armies: Barracks.Armies;
  voices: matter.Option[];
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ armies, voices, onSubmit }: Props) => {
  const { handleSubmit, control } = useFormContext<Barracks.Settings>();

  const { field: defaultArmyField } = useController({
    control,
    name: 'defaultArmy'
  });
  const { field: listDisplayModeField } = useController({ name: 'listDisplayMode', control });
  const { field: voiceField } = useController({ name: 'voice', control });

  const armyOptions = useMemo(
    () =>
      Object.keys(armies)
        .filter((k) => k !== 'lastUpdated')
        .map((key, index) => ({ value: index, description: armies[key].name } as matter.Option)),
    [armies]
  );

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
      <Section title="Settings" description="Army Lists">
        <SelectField
          name="army"
          options={armyOptions}
          label="Default Army"
          value={defaultArmyField.value}
          onChange={defaultArmyField.onChange}
          required
        />
        <SelectField
          label="Display Mode"
          options={[
            { value: 'minimal', description: 'Minimal' },
            { value: 'verbose', description: 'Detailed' }
          ]}
          value={listDisplayModeField.value}
          onChange={listDisplayModeField.onChange}
          required
        />
      </Section>
      <Section title="Settings" description="Speech To Text">
        <SelectField
          label="Voice"
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
