import { useController, useFormContext } from 'react-hook-form';
import { Form, InputField, SelectField } from '@fjlaubscher/matter';
import { useCallback, useMemo } from 'react';

export interface FormValues {
  army: string;
  armyId: number;
  name: string;
  notes: string;
  limit: number;
}

interface Props {
  armies: Barracks.Armies;
  onSubmit: (values: Omit<FormValues, 'armyId'>) => void;
}

const ListForm = ({ armies, onSubmit }: Props) => {
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
        .map((key, index) => ({ value: index, description: armies[key].name } as matter.Option)),
    [armies]
  );

  const { field: armyIdField } = useController({
    control,
    name: 'armyId'
  });
  const { field: armyField } = useController({
    control,
    name: 'army'
  });

  const handleArmySelect = useCallback(
    (index: number) => {
      const selectedKey = Object.keys(armies)[index];

      armyField.onChange(selectedKey);
      armyIdField.onChange(index);
    },
    [armyIdField, armyField, armies]
  );

  return (
    <Form id="list-form" onSubmit={handleSubmit(onSubmit)}>
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
