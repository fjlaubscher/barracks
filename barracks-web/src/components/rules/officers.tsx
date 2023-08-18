import { Table } from '@fjlaubscher/matter';

import styles from './rules.module.scss';

const Officers = () => (
  <Table
    className={styles.table}
    headings={[
      { text: 'Rank' },
      { text: 'Morale Bonus' },
      { text: 'Extra Orders' },
      { text: 'Range' }
    ]}
  >
    <tr>
      <td className={styles.noWrap}>2nd Lieutenant</td>
      <td className={styles.center}>+1</td>
      <td className={styles.center}>1</td>
      <td className={styles.center}>6"</td>
    </tr>
    <tr>
      <td className={styles.noWrap}>1st Lieutenant</td>
      <td className={styles.center}>+2</td>
      <td className={styles.center}>2</td>
      <td className={styles.center}>6"</td>
    </tr>
    <tr>
      <td className={styles.noWrap}>Captain</td>
      <td className={styles.center}>+3</td>
      <td className={styles.center}>3</td>
      <td className={styles.center}>12"</td>
    </tr>
    <tr>
      <td className={styles.noWrap}>Major</td>
      <td className={styles.center}>+4</td>
      <td className={styles.center}>4</td>
      <td className={styles.center}>12"</td>
    </tr>
  </Table>
);

export default Officers;
