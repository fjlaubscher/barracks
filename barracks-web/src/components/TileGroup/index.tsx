import { DetailedHTMLProps, HTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './TileGroup.module.scss';

const TileGroup = ({
  className,
  children,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div className={classnames(styles.group, className)} {...rest}>
    {children}
  </div>
);

export default TileGroup;
