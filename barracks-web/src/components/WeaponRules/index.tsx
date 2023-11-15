import { useMemo } from 'react';
import classnames from 'classnames';
import { Table } from '@fjlaubscher/matter';

import styles from './WeaponRules.module.scss';

interface Props {
  weapons: Barracks.Core['weapons'];
}

const Weapons = ({ weapons }: Props) => {
  const [smallArms, heavyWeapons] = useMemo(() => {
    const flattened = Object.keys(weapons).map((key) => weapons[key]);
    const smallArms = flattened.filter((weapon) => !weapon.heavy);
    const heavyWeapons = flattened.filter((weapon) => weapon.heavy);

    return [smallArms, heavyWeapons];
  }, [weapons]);

  return (
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
        {smallArms.map((weapon, i) => (
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
        {heavyWeapons.map((weapon, i) => (
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
};

export default Weapons;
