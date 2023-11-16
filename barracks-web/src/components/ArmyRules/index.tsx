import { Grid } from '@fjlaubscher/matter';

// components
import Card from '../Card';

import styles from './ArmyRules.module.scss';

interface Props {
  army: Barracks.Army;
}

const ArmyRules = ({ army }: Props) => (
  <Grid simple>
    {army.rules.map((rule, i) => (
      <Card key={`army-rule-${i}`} title={rule.name}>
        <div className={styles.armyRule} dangerouslySetInnerHTML={{ __html: rule.description }} />
      </Card>
    ))}
  </Grid>
);

export default ArmyRules;
