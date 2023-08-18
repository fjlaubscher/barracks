import { ReactNode } from 'react';
import { MdAdd, MdClose, MdSave } from 'react-icons/md';
import { IconButton, Stack } from '@fjlaubscher/matter';

import styles from './section.module.scss';

interface Props {
  id?: string;
  className?: string;
  children: ReactNode;
  title: string;
  description: string;
  onAddClick?: () => void;
  onCloseClick?: () => void;
  onSaveClick?: () => void;
}

const Section = ({
  id,
  className,
  children,
  title,
  description,
  onAddClick,
  onCloseClick,
  onSaveClick
}: Props) => (
  <Stack id={id} className={className} direction="column">
    <Stack className={styles.header} direction="row">
      <Stack className={styles.heading} direction="column">
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </Stack>
      {onCloseClick && (
        <IconButton className={styles.action} onClick={onCloseClick}>
          <MdClose />
        </IconButton>
      )}
      {onAddClick && (
        <IconButton className={styles.action} onClick={onAddClick}>
          <MdAdd />
        </IconButton>
      )}
      {onSaveClick && (
        <IconButton className={styles.action} onClick={onSaveClick}>
          <MdSave />
        </IconButton>
      )}
    </Stack>
    <Stack className={styles.content} direction="column">
      {children}
    </Stack>
  </Stack>
);

export default Section;
