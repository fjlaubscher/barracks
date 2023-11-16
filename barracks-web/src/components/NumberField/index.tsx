import { MdRemove, MdAdd } from 'react-icons/md';
import { Button, Field } from '@fjlaubscher/matter';

import styles from './NumberField.module.scss';

export interface Props {
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
  <Field className={className} error={errorMessage} data-testid="number-field">
    <div className={styles.labels}>
      <label htmlFor={name} data-testid="number-field-label">
        {label}
      </label>
      {maximum > 1 && value !== maximum ? (
        <span
          onClick={() => onChange(maximum)}
          className={styles.max}
          data-testid="number-field-max"
        >
          Max
        </span>
      ) : undefined}
    </div>
    <div className={styles.buttons}>
      <Button
        variant="error"
        disabled={value === minimum}
        onClick={() => onChange(value - step)}
        data-testid="number-field-decrease"
      >
        <MdRemove />
      </Button>
      <input
        id={name}
        onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
        name={name}
        type="number"
        placeholder={placeholder}
        value={value}
        data-testid="number-field-input"
      />
      <Button
        variant="success"
        disabled={value === maximum}
        onClick={() => onChange(value + step)}
        data-testid="number-field-increase"
      >
        <MdAdd />
      </Button>
    </div>
  </Field>
);

export default NumberField;
