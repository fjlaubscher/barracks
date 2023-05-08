import { FaArrowLeft } from 'react-icons/fa';

// components
import LinkButton from './link';

import styles from './button.module.scss';

interface Props {
  to: string;
  text?: string;
}

const BackButton = ({ to, text }: Props) => (
  <LinkButton className={styles.back} leftIcon={<FaArrowLeft />} to={to}>
    {text || 'Back'}
  </LinkButton>
);

export default BackButton;
