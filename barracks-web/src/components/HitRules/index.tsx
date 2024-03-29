import { Table } from '@fjlaubscher/matter';

import styles from './HitRules.module.scss';

interface Props {
  hits: Barracks.Core['hit'];
}

const Hit = ({ hits }: Props) => (
  <Table headings={[{ text: 'Type' }, { text: 'Modifier' }]}>
    {hits.map((h, i) => (
      <tr key={`hit-${i}`}>
        <td className={styles.stretch}>{h.type}</td>
        <td className={styles.center}>{h.modifier}</td>
      </tr>
    ))}
  </Table>
);

export default Hit;
