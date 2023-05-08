import classnames from 'classnames';
import { Table } from '@fjlaubscher/matter';

import styles from './rules.module.scss';

interface Props {
  weapons: Barracks.Core['weapons'];
}

const Weapons = ({ weapons }: Props) => (
  <>
    <Table
      headings={[
        { text: 'Small Arms' },
        { text: 'Range' },
        { text: 'Shots' },
        { text: 'Pen' },
        { text: 'Rules' }
      ]}
    >
      {weapons['small-arms'].map((weapon, i) => (
        <tr key={`weapon-type-${i}`}>
          <td>{weapon.type}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.range}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.shots}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.pen}</td>
          <td>{weapon.rules.join(', ')}</td>
        </tr>
      ))}
    </Table>
    <Table
      headings={[
        { text: 'Heavy Weapons', className: styles.noWrap },
        { text: 'Range' },
        { text: 'Shots' },
        { text: 'Pen' },
        { text: 'Rules' }
      ]}
    >
      {weapons['heavy-weapons'].map((weapon, i) => (
        <tr key={`weapon-type-${i}`}>
          <td>{weapon.type}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.range}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.shots}</td>
          <td className={classnames(styles.center, styles.noWrap)}>{weapon.pen}</td>
          <td className={styles.noWrap}>{weapon.rules.join(', ')}</td>
        </tr>
      ))}
    </Table>
  </>
);

export default Weapons;
