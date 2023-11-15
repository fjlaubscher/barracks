import { Table } from '@fjlaubscher/matter';

import styles from './MoraleRules.module.scss';

const Morale = () => (
  <Table
    className={styles.table}
    headings={[{ text: 'Quality' }, { text: 'Morale', className: styles.center }]}
  >
    <tr>
      <td className={styles.stretch}>Inexperienced</td>
      <td className={styles.center}>8</td>
    </tr>
    <tr>
      <td className={styles.stretch}>Regular</td>
      <td className={styles.center}>9</td>
    </tr>
    <tr>
      <td className={styles.stretch}>Veteran</td>
      <td className={styles.center}>10</td>
    </tr>
  </Table>
);

export default Morale;
