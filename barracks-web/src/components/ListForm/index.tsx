import { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Field, Form, InputField, SelectField } from '@fjlaubscher/matter';

// components
import Toggle from '../Toggle';

export interface FormValues {
  army: string;
  name: string;
  notes: string;
  limit: number;
  public: boolean;
}

interface Props {
  armies: Barracks.Armies;
  onSubmit: (values: FormValues) => void;
  isPublicAllowed: boolean;
}

const ListForm = ({ armies, onSubmit, isPublicAllowed }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<FormValues>();

  const armyOptions = useMemo(
    () =>
      Object.keys(armies)
        .filter((k) => k !== 'lastUpdated')
        .map((key) => ({ value: key, description: armies[key].name }) as matter.Option),
    [armies]
  );

  const { field: armyField } = useController({
    control,
    name: 'army'
  });
  const { field: publicField } = useController({
    control,
    name: 'public',
    defaultValue: isPublicAllowed
  });

  return (
    <Form id="list-form" onSubmit={handleSubmit(onSubmit)}>
      {isPublicAllowed && (
        <Field>
          <Toggle
            label={publicField.value ? 'Public' : 'Private'}
            onChange={(e) => publicField.onChange(e.target.checked)}
            defaultChecked
          />
        </Field>
      )}
      <InputField
        label="Name"
        type="text"
        placeholder="Eg. British 8th"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
        required
      />
      <SelectField
        name="army"
        options={armyOptions}
        label="Army"
        value={armyField.value}
        onChange={armyField.onChange}
        required
      />
      <InputField
        label="Points Limit"
        type="number"
        placeholder="Eg. 1000"
        errorMessage={errors.limit ? 'Required' : undefined}
        {...register('limit', { required: true, valueAsNumber: true })}
        required
      />
    </Form>
  );
};

export default ListForm;
