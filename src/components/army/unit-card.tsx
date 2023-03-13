import { Card, Table } from '@fjlaubscher/matter';

import styles from './army.module.scss';

interface Props {
  className?: string;
  unit: Barracks.Unit;
}

const ArmyUnitCard = ({ className, unit }: Props) => (
  <Card className={className} title={unit.name}>
    <Table
      headings={[
        { text: 'Unit' },
        { text: 'Inexperienced' },
        { text: 'Regular' },
        { text: 'Veteran' }
      ]}
    >
      {unit.profiles.map((profile, costIndex) => (
        <tr key={`unit-cost-${costIndex}`}>
          <td>{profile.name}</td>
          <td>{profile.cost.inexperienced || '-'}</td>
          <td>{profile.cost.regular || '-'}</td>
          <td>{profile.cost.veteran || '-'}</td>
        </tr>
      ))}
    </Table>
    <div className={styles.section}>
      <h4>Composition</h4>
      <p>{unit.composition}</p>
    </div>
    <div className={styles.section}>
      <h4>Weapons</h4>
      <p>{unit.weapons}</p>
    </div>
    {unit.damage && (
      <div className={styles.section}>
        <h4>Damage Value</h4>
        <p>{unit.damage}</p>
      </div>
    )}
    {unit.transport && (
      <div className={styles.section}>
        <h4>Transport</h4>
        <p>{unit.transport}</p>
      </div>
    )}
    {unit.tow && (
      <div className={styles.section}>
        <h4>Tow</h4>
        <p>{unit.tow}</p>
      </div>
    )}
    {unit.options.length > 0 && (
      <div className={styles.section}>
        <h4>Options</h4>
        <ul>
          {unit.options.map((option, optionIndex) => (
            <li key={`unit-option-${optionIndex}`}>{option.name}</li>
          ))}
        </ul>
      </div>
    )}
    {unit.rules.length > 0 && (
      <div className={styles.section}>
        <h4>Special Rules</h4>
        <ul>
          {unit.rules.map((rule, ruleIndex) => (
            <li key={`unit-rule-${ruleIndex}`}>{rule}</li>
          ))}
        </ul>
      </div>
    )}
  </Card>
);

export default ArmyUnitCard;
