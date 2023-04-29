import type { ReactNode } from 'react';
import classnames from 'classnames';
import { FaTrash, FaClone } from 'react-icons/fa';
import { Card as MatterCard, Stack, IconButton } from '@fjlaubscher/matter';
import type { CardProps } from '@fjlaubscher/matter';

import styles from './card.module.scss';

type Props = Omit<CardProps, 'children'> & {
  children?: ReactNode;
  description?: string;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
};

const Card = ({
  children,
  className,
  onClick,
  onCopyClick,
  onDeleteClick,
  title,
  description
}: Props) => (
  <MatterCard className={classnames(styles.card, className)} onClick={onClick}>
    <Stack className={styles.header} direction="row">
      <Stack className={styles.title} direction="column">
        <span>{title}</span>
        {description && <span className={styles.description}>{description}</span>}
      </Stack>
      {onCopyClick || onDeleteClick ? (
        <Stack className={styles.buttons} direction="row">
          {onCopyClick && (
            <IconButton
              className={styles.button}
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                if (onCopyClick) {
                  onCopyClick();
                }
              }}
            >
              <FaClone />
            </IconButton>
          )}
          {onDeleteClick && (
            <IconButton
              className={styles.button}
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                if (onDeleteClick) {
                  onDeleteClick();
                }
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
