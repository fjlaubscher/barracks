import { useController, useForm } from 'react-hook-form';
import { Button, Form } from '@fjlaubscher/matter';

// components
import NumberField from '../field/number';

export interface FormValues {
  totalPlayerDice: number;
  totalAiDice: number;
}

interface Props {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
}

const CompleteRoundForm = ({ initialValues, onSubmit }: Props) => {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormValues>({ mode: 'onChange', defaultValues: initialValues });

  const { field: playerDiceField } = useController({
    control,
    name: 'totalPlayerDice'
  });
  const { field: aiDiceField } = useController({
    control,
    name: 'totalAiDice'
  });

  return (
    <Form id="complete-round-form" onSubmit={handleSubmit(onSubmit)}>
      <NumberField
        label="Remaining Player Dice"
        name="totalPlayerDice"
        maximum={initialValues?.totalPlayerDice}
        value={playerDiceField.value}
        onChange={playerDiceField.onChange}
        errorMessage={errors.totalPlayerDice?.message}
      />
      <NumberField
        label="Remaining AI Dice"
        name="totalAiDice"
        maximum={initialValues?.totalAiDice}
        value={aiDiceField.value}
        onChange={aiDiceField.onChange}
        errorMessage={errors.totalAiDice?.message}
      />
      <Button type="submit">Next Round</Button>
    </Form>
  );
};

export default CompleteRoundForm;
