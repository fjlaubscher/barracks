import { useState } from 'react';
import { Button, Stack, Modal } from '@fjlaubscher/matter';
import { FaSignOutAlt, FaUndo } from 'react-icons/fa';

import styles from './avatar.module.scss';

interface Props {
  user: Barracks.User;
  onSignOut: () => void;
}

const Avatar = ({ user, onSignOut }: Props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.avatar} onClick={() => setShowModal(true)}>
        <img className={styles.image} src={user.avatar} alt={user.name} />
        <span className={styles.name}>{user.name}</span>
      </button>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Stack direction="column">
          <span>Would you like to sign out?</span>
          <Stack className={styles.buttons} direction="row">
            <Button className={styles.cancel} type="button" onClick={() => setShowModal(false)}>
              <FaUndo />
              Cancel
            </Button>
            <Button
              variant="error"
              onClick={() => {
                onSignOut();
                setShowModal(false);
              }}
            >
              <FaSignOutAlt />
              Sign Out
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Avatar;
