import { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './stats.module.scss';

interface Props {
  className?: string;
  children: ReactNode;
}

const Stats = ({ className, children }: Props) => (
  <div className={classnames(styles.stats, className)}>{children}</div>
);

export default Stats;
