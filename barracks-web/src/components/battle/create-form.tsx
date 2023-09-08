import { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Field, Form, InputField, SelectField } from '@fjlaubscher/matter';

// components
import Toggle from '../toggle';

export interface FormValues {
  name: string;
  playerListKey: string;
  opponentListKey: string;
  isAIOpponent: boolean;
}

interface Props {
  lists: Barracks.Lists;
  onSubmit: (values: FormValues) => void;
}

const CreateBattleForm = ({ lists, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useFormContext<FormValues>();

  const listOptions = useMemo(
    () =>
      Object.keys(lists).map(
        (key) => ({ value: key, description: lists[key].name }) as matter.Option
      ),
    [lists]
  );

  const { field: playerListField } = useController({
    control,
    name: 'playerListKey'
  });
  const { field: isAIOpponentField } = useController({
    control,
    name: 'isAIOpponent',
    defaultValue: false
  });
  const { field: opponentListField } = useController({
    control,
    name: 'opponentListKey'
  });

  return (
    <Form id="battle-form" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Name"
        type="text"
        placeholder="Battle of the Bulge"
        errorMessage={errors.name ? 'Required' : undefined}
        {...register('name', { required: true })}
        required
      />
      <Field>
        <Toggle
          label="Use AI opponent (experimental)"
          onChange={(e) => isAIOpponentField.onChange(e.target.checked)}
        />
      </Field>
      <SelectField
        name="playerListKey"
        options={listOptions}
        label="Your Army List"
        value={playerListField.value}
        onChange={playerListField.onChange}
        required
      />
      {isAIOpponentField.value && (
        <SelectField
          name="opponentListKey"
          options={listOptions}
          label="AI Army List"
          value={opponentListField.value}
          onChange={opponentListField.onChange}
          required
        />
      )}
    </Form>
  );
};

export default CreateBattleForm;
