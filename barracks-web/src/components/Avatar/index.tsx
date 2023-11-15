import { useState } from 'react';
import { Button, Stack, Modal } from '@fjlaubscher/matter';
import { MdLogout, MdUndo } from 'react-icons/md';

import styles from './Avatar.module.scss';

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
        <Stack className={styles.modal} direction="column">
          <h4>Would you like to sign out?</h4>
          <p>By signing out, all army lists on your device will be deleted.</p>
          <Stack className={styles.buttons} direction="row">
            <Button className={styles.cancel} type="button" onClick={() => setShowModal(false)}>
              <MdUndo />
              Cancel
            </Button>
            <Button
              variant="error"
              onClick={() => {
                onSignOut();
                setShowModal(false);
              }}
            >
              <MdLogout />
              Sign Out
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default Avatar;
