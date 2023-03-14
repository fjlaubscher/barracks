import { ReactNode } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IconButton, Stack } from '@fjlaubscher/matter';

import styles from './section.module.scss';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
  title: string;
  description: string;
  onAddClick?: () => void;
}

const Section = ({ id, className, children, title, description, onAddClick }: Props) => (
  <Stack id={id} className={className} direction="column">
    <Stack className={styles.header} direction="row">
      <Stack className={styles.heading} direction="column">
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </Stack>
      {onAddClick && (
        <IconButton className={styles.action} onClick={onAddClick}>
          <FaPlus />
        </IconButton>
      )}
    </Stack>
    <Stack direction="column">{children}</Stack>
  </Stack>
);

export default Section;
