import { ReactNode } from 'react';
import { MdAdd, MdClose, MdVolumeUp } from 'react-icons/md';
import { IconButton, Stack } from '@fjlaubscher/matter';

import styles from './section.module.scss';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
  title: string;
  description: string;
  onAddClick?: () => void;
  onSpeakClick?: () => void;
  onBackClick?: () => void;
}

const Section = ({
  id,
  className,
  children,
  title,
  description,
  onAddClick,
  onSpeakClick,
  onBackClick
}: Props) => (
  <Stack id={id} className={className} direction="column">
    <Stack className={styles.header} direction="row">
      <Stack className={styles.heading} direction="column">
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </Stack>
      {onAddClick && (
        <IconButton className={styles.action} onClick={onAddClick}>
          <MdAdd />
        </IconButton>
      )}
      {onSpeakClick && (
        <IconButton className={styles.action} onClick={onSpeakClick}>
          <MdVolumeUp />
        </IconButton>
      )}
      {onBackClick && (
        <IconButton className={styles.action} onClick={onBackClick}>
          <MdClose />
        </IconButton>
      )}
    </Stack>
    <Stack direction="column">{children}</Stack>
  </Stack>
);

export default Section;
