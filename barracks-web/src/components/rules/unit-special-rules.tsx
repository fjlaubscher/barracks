import { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Modal, Stack, TagGroup, Tag, IconButton } from '@fjlaubscher/matter';

// helpers
import { buildRulesWithDescriptions } from '../../helpers/rule';

import styles from './rules.module.scss';

interface Props {
  className?: string;
  army?: Barracks.Army;
  core?: Barracks.Core;
  rules: string[];
}

const UnitSpecialRules = ({ className, army, core, rules }: Props) => {
  const [selectedRule, setSelectedRule] = useState<Barracks.Item | undefined>(undefined);

  const parsedRules: Barracks.Item[] = useMemo(
    () => (army && core ? buildRulesWithDescriptions(army, core, rules) : []),
    [army, core, rules]
  );

  return (
    <div className={className}>
      <h4>Special Rules</h4>
      <TagGroup>
        {parsedRules.map((rule, i) => (
          <Tag
            className={styles.tag}
            key={`rule-${i}`}
            onClick={() => setSelectedRule(rule.description ? rule : undefined)}
            data-testid="list-unit-card-rule"
          >
            {rule.name}
          </Tag>
        ))}
      </TagGroup>
      <Modal
        className={styles.modal}
        open={!!selectedRule}
        onClose={() => setSelectedRule(undefined)}
      >
        <Stack className={styles.ruleModal} direction="column">
          <div className={styles.title}>
            <h3>{selectedRule?.name}</h3>
            <IconButton className={styles.close} onClick={() => setSelectedRule(undefined)}>
              <MdClose />
            </IconButton>
          </div>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: selectedRule?.description || 'Error retrieving rule description'
            }}
          />
        </Stack>
      </Modal>
    </div>
  );
};

export default UnitSpecialRules;
