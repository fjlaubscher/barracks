import classnames from 'classnames';
import { FaTrash, FaCopy } from 'react-icons/fa';
import { Card as MatterCard, Stack, IconButton } from '@fjlaubscher/matter';
import type { CardProps } from '@fjlaubscher/matter';

import styles from './card.module.scss';

type Props = Omit<CardProps, 'children'> & {
  children?: React.ReactNode;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
};

const Card = ({ children, className, onClick, onCopyClick, onDeleteClick, title }: Props) => (
  <MatterCard className={classnames(styles.card, className)} onClick={onClick}>
    <Stack className={styles.title} direction="row">
      <span>{title}</span>
      {onCopyClick || onDeleteClick ? (
        <Stack className={styles.buttons} direction="row">
          {onCopyClick && (
            <IconButton
              className={styles.button}
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                onCopyClick();
              }}
            >
              <FaCopy />
            </IconButton>
          )}
          {onDeleteClick && (
            <IconButton
              className={styles.button}
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick();
              }}
            >
              <FaTrash />
            </IconButton>
          )}
        </Stack>
      ) : undefined}
    </Stack>
    {children}
  </MatterCard>
);

export default Card;
