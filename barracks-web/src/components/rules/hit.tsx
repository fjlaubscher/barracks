import { Table } from '@fjlaubscher/matter';

import styles from './rules.module.scss';

interface Props {
  hits: Barracks.Core['hit'];
}

const Hit = ({ hits }: Props) => (
  <Table className={styles.table} headings={[{ text: 'Type' }, { text: 'Modifier' }]}>
    {hits.map((h, i) => (
      <tr key={`hit-${i}`}>
        <td className={styles.stretch}>{h.type}</td>
        <td className={styles.center}>{h.modifier}</td>
      </tr>
    ))}
  </Table>
);

export default Hit;
