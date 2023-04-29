import { useState } from 'react';
import { IconButton, Modal } from '@fjlaubscher/matter';
import { FaLayerGroup } from 'react-icons/fa';

import styles from './contents-modal.module.scss';

interface Props {
  items: {
    [key: string]: Barracks.ItemLink[];
  };
  visible?: boolean;
}

const ContentsModal = ({ items, visible }: Props) => {
  const [showModal, setShowModal] = useState(visible ?? false);

  return (
    <>
      <IconButton className={styles.contentsButton} onClick={() => setShowModal(!showModal)}>
        <FaLayerGroup />
      </IconButton>
      <Modal visible={showModal}>
        <ul className={styles.contents}>
          {Object.keys(items).map((key) => (
            <li key={`contents-${key}`}>
              {key}
              <ul>
                {items[key].map((item, i) => (
                  <li key={`contents-${key}-${i}`}>
                    <a href={item.href} onClick={() => setShowModal(false)}>
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
