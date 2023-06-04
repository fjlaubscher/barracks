import classnames from 'classnames';
import { Stack, Table } from '@fjlaubscher/matter';

// components
import Card from '../card';

import styles from './army.module.scss';

export interface Props {
  className?: string;
  unit: Barracks.Unit;
}

const ArmyUnitCard = ({ className, unit }: Props) => (
  <Card
    className={className}
    title={unit.name}
    testIds={{
      card: 'army-unit-card',
      title: 'army-unit-card-title',
      copyButton: 'army-unit-card-copy',
      deleteButton: 'army-unit-card-delete'
    }}
  >
    <Stack direction="column">
      <Table
        headings={[
          { text: 'Unit' },
          { text: 'Inexperienced' },
          { text: 'Regular' },
          { text: 'Veteran' }
        ]}
        data-testid="army-unit-card-profiles"
      >
        {unit.profiles.map((profile, costIndex) => (
          <tr key={`unit-cost-${costIndex}`}>
            <td>{profile.name}</td>
            <td className={styles.center}>{profile.cost.inexperienced ?? '-'}</td>
            <td className={styles.center}>{profile.cost.regular ?? '-'}</td>
            <td className={styles.center}>{profile.cost.veteran ?? '-'}</td>
          </tr>
        ))}
      </Table>
      <div className={styles.section} data-testid="army-unit-card-composition">
        <h4>Composition</h4>
        <p>{unit.composition}</p>
      </div>
      <div className={styles.section} data-testid="army-unit-card-weapons">
        <h4>Weapons</h4>
        <p>{unit.weapons}</p>
      </div>
      {unit.damage && (
        <div className={styles.section} data-testid="army-unit-card-damage">
          <h4>Damage Value</h4>
          <p>{unit.damage}</p>
        </div>
      )}
      {unit.transport && (
        <div className={styles.section} data-testid="army-unit-card-transport">
          <h4>Transport</h4>
          <p>{unit.transport}</p>
        </div>
      )}
      {unit.tow && (
        <div className={styles.section} data-testid="army-unit-card-tow">
          <h4>Tow</h4>
          <p>{unit.tow}</p>
        </div>
      )}
      {unit.options.length > 0 && (
        <div className={styles.section} data-testid="army-unit-card-options">
          <Table
            headings={[
              { text: 'Options' },
              { text: 'Cost', className: styles.center },
              { text: 'Max', className: styles.center }
            ]}
          >
            {unit.options.map((o, i) => (
              <tr key={`unit-option-${i}`}>
                <td className={styles.noWrap}>{o.name}</td>
                <td className={classnames(styles.center, styles.noWrap)}>
                  {Object.keys(o.cost)
                    .map((key) => o.cost[key])
                    .join(' | ')}
                </td>
                <td className={styles.center}>{o.max || ''}</td>
              </tr>
            ))}
          </Table>
        </div>
      )}
      {unit.rules.length > 0 && (
        <div className={styles.section}>
          <h4>Special Rules</h4>
          <ul data-testid="army-unit-card-special-rules">
            {unit.rules.map((rule, ruleIndex) => (
              <li key={`unit-rule-${ruleIndex}`}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </Stack>
  </Card>
);

export default ArmyUnitCard;
