import classnames from 'classnames';
import { FaTrash } from 'react-icons/fa';
import { Card as MatterCard, Stack, IconButton } from '@fjlaubscher/matter';
import type { CardProps } from '@fjlaubscher/matter';

import styles from './card.module.scss';

type Props = Omit<CardProps, 'children'> & {
  children?: React.ReactNode;
  onDeleteClick?: () => void;
};

const Card = ({ children, className, onClick, onDeleteClick, title }: Props) => (
  <MatterCard className={classnames(styles.card, className)} onClick={onClick}>
    <Stack className={styles.title} direction="row">
      <span>{title}</span>
      {onDeleteClick && (
        <IconButton
          className={styles.delete}
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
    {children}
  </MatterCard>
);

export default Card;
