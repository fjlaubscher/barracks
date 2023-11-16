import { MdChevronLeft } from 'react-icons/md';

// components
import LinkButton from '../LinkButton';

import styles from './BackButton.module.scss';

interface Props {
  to: string;
  text?: string;
}

const BackButton = ({ to, text }: Props) => (
  <LinkButton className={styles.back} to={to}>
    <MdChevronLeft />
    {text || 'Back'}
  </LinkButton>
);

export default BackButton;
