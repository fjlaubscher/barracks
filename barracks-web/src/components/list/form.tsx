import { useController, useFormContext } from 'react-hook-form';
import { Field, Form, InputField, SelectField } from '@fjlaubscher/matter';
import { useCallback, useMemo } from 'react';
import type { ChangeEvent } from 'react';

// components
import Toggle from '../toggle';

export interface FormValues {
  army: string;
  armyId: number;
  name: string;
  notes: string;
  limit: number;
  public: boolean;
}

interface Props {
  armies: Omit<Barracks.Armies, 'lastUpdated'>;
  onSubmit: (values: Omit<FormValues, 'armyId'>) => void;
  isPublicAllowed: boolean;
}

const ListForm = ({ armies, onSubmit, isPublicAllowed }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<FormValues>();
  const armyKeys = useMemo(() => Object.keys(armies).filter((k) => k !== 'lastUpdated'), [armies]);

  const armyOptions = useMemo(
    () =>
      armyKeys.map(
        (key, index) => ({ value: index, description: armies[key].name } as matter.Option)
      ),
    [armies, armyKeys]
  );

  const { field: armyIdField } = useController({
    control,
    name: 'armyId'
  });
  const { field: armyField } = useController({
    control,
    name: 'army'
  });
  const { field: publicField } = useController({
    control,
    name: 'public',
    defaultValue: isPublicAllowed
  });

  const handleArmySelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const index = parseInt(e.target.value);

      if (!isNaN(index)) {
        const selectedKey = armyKeys[index];

        armyField.onChange(selectedKey);
        armyIdField.onChange(index);
      }
    },
    [armyIdField, armyField, armies]
  );

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
        value={armyIdField.value}
        onChange={handleArmySelect}
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
