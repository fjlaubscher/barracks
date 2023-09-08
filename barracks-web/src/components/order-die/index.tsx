import { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';

import styles from './order-die.module.scss';

const RANDOM_MIN = 0;
const RANDOM_MAX = 6;

const generateRandom = () =>
  (Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN)) + RANDOM_MIN) * 90;

const OrderDie = () => {
  const [transform, setTransform] = useState<string | undefined>(undefined);

  const handleRoll = useCallback(() => {
    const x = generateRandom();
    const y = generateRandom();

    setTransform(`rotateX(${x}deg) rotateY(${y}deg)`);
  }, [setTransform]);

  useEffect(() => {
    handleRoll();
  }, []);

  return (
    <div className={styles.perspective}>
      <div className={styles.die} style={{ transform }}>
        <div className={classnames(styles.face, styles.advance)}>Advance</div>
        <div className={classnames(styles.face, styles.run)}>Run</div>
        <div className={classnames(styles.face, styles.fire)}>Fire</div>
        <div className={classnames(styles.face, styles.down)}>Down</div>
        <div className={classnames(styles.face, styles.rally)}>Rally</div>
        <div className={classnames(styles.face, styles.ambush)}>Ambush</div>
      </div>
    </div>
  );
};

export default OrderDie;
