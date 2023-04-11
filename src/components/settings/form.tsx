import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Form, InputField } from '@fjlaubscher/matter';

// components
import Section from '../section';

// helpers
import { DEFAULT_SETTINGS } from '../../helpers/settings';

import styles from './settings.module.scss';

interface Props {
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useFormContext<Barracks.Settings>();

  const handleThemeReset = useCallback(() => {
    setValue('primaryColor', DEFAULT_SETTINGS.primaryColor);
    setValue('accentColor', DEFAULT_SETTINGS.accentColor);
  }, [setValue]);

  return (
    <Form className={styles.form} id="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Section title="Settings" description="Theme">
        <InputField
          label="Primary Colour"
          type="color"
          errorMessage={errors.primaryColor ? 'Required' : undefined}
          {...register('primaryColor', { required: true })}
          required
        />
        <InputField
          label="Accent Colour"
          type="color"
          errorMessage={errors.accentColor ? 'Required' : undefined}
          {...register('accentColor', { required: true })}
          required
        />
        <Button type="button" onClick={handleThemeReset}>
          Reset
        </Button>
      </Section>
    </Form>
  );
};

export default SettingsForm;