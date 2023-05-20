import { useState } from 'react';
import { IconButton, Modal } from '@fjlaubscher/matter';
import { FaLayerGroup } from 'react-icons/fa';

import styles from './contents-modal.module.scss';

interface Props {
  items: {
    [key: string]: Barracks.ItemLink[];
  };
}

const ContentsModal = ({ items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <IconButton
          className={styles.contentsButton}
          onClick={() => setIsOpen(true)}
          variant="accent"
        >
          <FaLayerGroup />
        </IconButton>
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ul className={styles.contents}>
          {Object.keys(items).map((key) => (
            <li key={`contents-${key}`}>
              {key}
              <ul>
                {items[key].map((item, i) => (
                  <li key={`contents-${key}-${i}`}>
                    <a href={item.href} onClick={() => setIsOpen(false)}>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};

export default ContentsModal;
