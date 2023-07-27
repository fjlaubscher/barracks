import { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Form, SelectField } from '@fjlaubscher/matter';

// components
import Section from '../section';

import styles from './settings.module.scss';

interface Props {
  armies: Barracks.Armies;
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ armies, onSubmit }: Props) => {
  const { handleSubmit, control } = useFormContext<Barracks.Settings>();

  const { field: defaultArmyField } = useController({
    control,
    name: 'defaultArmy'
  });
  const { field: listDisplayModeField } = useController({ name: 'listDisplayMode', control });

  const armyOptions = useMemo(
    () =>
      Object.keys(armies)
        .filter((k) => k !== 'lastUpdated')
        .map((key, index) => ({ value: key, description: armies[key].name }) as matter.Option),
    [armies]
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
    </Form>
  );
};

export default SettingsForm;
