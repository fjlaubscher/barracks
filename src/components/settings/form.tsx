import { useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Button, Form, InputField, SelectField } from '@fjlaubscher/matter';

// components
import Section from '../section';

// helpers
import { BANNER_IMAGES, DEFAULT_SETTINGS } from '../../helpers/settings';

import styles from './settings.module.scss';

interface Props {
  onSubmit: (values: Barracks.Settings) => void;
}

const SettingsForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useFormContext<Barracks.Settings>();

  const { field: bannerField } = useController({
    control,
    name: 'banner'
  });

  const handleThemeReset = useCallback(() => {
    setValue('primaryColor', DEFAULT_SETTINGS.primaryColor);
    setValue('accentColor', DEFAULT_SETTINGS.accentColor);
    setValue('banner', DEFAULT_SETTINGS.banner);
  }, [setValue]);

  return (
    <Form className={styles.form} id="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <Section title="Settings" description="Theme">
        <SelectField
          label="Banner Image"
          options={BANNER_IMAGES.map((img, index) => ({ value: index, description: img.name }))}
          onChange={bannerField.onChange}
          name="banner"
          value={bannerField.value}
        />
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
