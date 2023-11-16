import type { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './Tile.module.scss';

interface Props {
  className?: string;
  icon?: ReactNode;
  text: string;
}

const Tile = ({ className, text, icon }: Props) => (
  <div className={classnames(styles.tile, className)}>
    {icon}
    <span>{text}</span>
  </div>
);

export default Tile;
