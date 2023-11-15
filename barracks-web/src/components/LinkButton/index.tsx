import { Button, ButtonProps } from '@fjlaubscher/matter';
import { Link } from 'react-router-dom';

import styles from './LinkButton.module.scss';

type Props = {
  to: string;
} & ButtonProps;

const LinkButton = ({ to, ...rest }: Props) => (
  <Link className={styles.link} to={to}>
    <Button {...(rest as ButtonProps)} />
  </Link>
);

export default LinkButton;
