import { FaMinus, FaPlus } from 'react-icons/fa';
import { Button, Field } from '@fjlaubscher/matter';

import styles from './field.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  onChange: (value: number) => void;
  label: string;
  name: string;
  value: number;
  step?: number;
  minimum?: number;
  maximum?: number;
}

const NumberField = ({
  className,
  placeholder,
  errorMessage,
  onChange,
  label,
  name,
  value,
  step = 1,
  minimum = 0,
  maximum = -1
}: Props) => (
  <Field className={className} error={errorMessage}>
    <label htmlFor={name}>{label}</label>
    <div className={styles.buttons}>
      <Button disabled={value === minimum} onClick={() => onChange(value - step)}>
        <FaMinus />
      </Button>
      <input
        id={name}
        onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
        name={name}
        type="number"
        placeholder={placeholder}
        value={value}
      />
      <Button disabled={value === maximum} onClick={() => onChange(value + step)}>
        <FaPlus />
      </Button>
    </div>
  </Field>
);

export default NumberField;
