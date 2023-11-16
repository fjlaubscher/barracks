import type { InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import { Stack } from '@fjlaubscher/matter';

import styles from './Toggle.module.scss';

type Props = {
  label: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>;

const Toggle = ({ className, label, onChange, defaultChecked }: Props) => (
  <Stack className={classnames(styles.container, className)} direction="column">
    <span className={styles.title}>{label}</span>
    <input
      id="toggle"
      className={styles.input}
      type="checkbox"
      onChange={onChange}
      defaultChecked={defaultChecked}
    />
    <label className={styles.label} htmlFor="toggle">
      Toggle
    </label>
  </Stack>
);

export default Toggle;
