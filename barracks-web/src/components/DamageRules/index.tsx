import { Table } from '@fjlaubscher/matter';

import styles from './DamageRules.module.scss';

interface Props {
  damage: Barracks.Core['damage'];
}

const Damage = ({ damage }: Props) => (
  <>
    <Table
      className={styles.table}
      headings={[{ text: 'Troops and Soft-Skinned Targets' }, { text: 'Result' }]}
    >
      {damage['troops'].map((damage, i) => (
        <tr key={`damage-${i}`}>
          <td className={styles.stretch}>{damage.type}</td>
          <td className={styles.center}>{damage.result}</td>
        </tr>
      ))}
    </Table>
    <Table className={styles.table} headings={[{ text: 'Armoured Targets' }, { text: 'Result' }]}>
      {damage['armoured-targets'].map((damage, i) => (
        <tr key={`damage-${i}`}>
          <td className={styles.stretch}>{damage.type}</td>
          <td className={styles.center}>{damage.result}</td>
        </tr>
      ))}
    </Table>
  </>
);

export default Damage;
