import type { ReactNode } from 'react';
import classnames from 'classnames';
import { MdDelete, MdCopyAll } from 'react-icons/md';
import { Card as MatterCard, Stack, IconButton, Image } from '@fjlaubscher/matter';
import type { CardProps } from '@fjlaubscher/matter';

import styles from './card.module.scss';

export type Props = {
  children?: ReactNode;
  description?: string;
  onCopyClick?: () => void;
  onDeleteClick?: () => void;
  testIds?: {
    card?: string;
    title?: string;
    description?: string;
    copyButton?: string;
    deleteButton?: string;
  };
} & Omit<CardProps, 'children'>;

const Card = ({
  id,
  children,
  className,
  onClick,
  onCopyClick,
  onDeleteClick,
  title,
  description,
  role,
  testIds
}: Props) => (
  <MatterCard
    id={id}
    className={classnames(styles.card, onClick && styles.isClickable, className)}
    onClick={onClick}
    role={role}
    data-testid={testIds?.card}
  >
    <Stack direction="column">
      <Stack className={styles.header} direction="row">
        <Stack className={styles.title} direction="column">
          <span data-testid={testIds?.title}>{title}</span>
          {description && (
            <span className={styles.description} data-testid={testIds?.description}>
              {description}
            </span>
          )}
        </Stack>
        {onCopyClick || onDeleteClick ? (
          <Stack className={styles.buttons} direction="row">
            {onCopyClick && (
              <IconButton
                className={styles.button}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCopyClick) {
                    onCopyClick();
                  }
                }}
                data-testid={testIds?.copyButton}
              >
                <MdCopyAll />
              </IconButton>
            )}
            {onDeleteClick && (
              <IconButton
                className={styles.button}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDeleteClick) {
                    onDeleteClick();
                  }
                }}
                data-testid={testIds?.deleteButton}
              >
                <MdDelete />
              </IconButton>
            )}
          </Stack>
        ) : undefined}
      </Stack>
      {children}
    </Stack>
  </MatterCard>
);

export default Card;
