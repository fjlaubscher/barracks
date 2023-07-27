import { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Modal, Stack, TagGroup, Tag, IconButton } from '@fjlaubscher/matter';

import styles from './rules.module.scss';

interface Props {
  className?: string;
  army?: Barracks.Army;
  core?: Barracks.Core;
  rules: string[];
}

const UnitSpecialRules = ({ className, army, core, rules }: Props) => {
  const [selectedRule, setSelectedRule] = useState<Barracks.Item | undefined>(undefined);

  const parsedRules: Barracks.Item[] = useMemo(() => {
    const specialRules: Barracks.Item[] = [];

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const hasOwnDescription = rule.includes(':');

      if (hasOwnDescription) {
        const [name, description] = rule.split(':');
        specialRules.push({ name, description });
      } else {
        // try to find the rule in core data
        let description = '';
        const ruleTypes = core ? Object.keys(core.rules) : [];

        for (let t = 0; t < ruleTypes.length; t++) {
          const filteredRules = core
            ? core.rules[ruleTypes[t]].filter((coreRule) =>
                rule.toLowerCase().includes(coreRule.name.toLowerCase())
              )
            : [];

          if (filteredRules.length) {
            description = filteredRules[0].description;
            break;
          }
        }

        if (!description && army) {
          // still nothing, check the army rules
          const filteredRules = army.rules.filter((armyRule) =>
            rule.toLowerCase().includes(armyRule.name.toLowerCase())
          );

          if (filteredRules.length) {
            description = filteredRules[0].description;
          }
        }

        specialRules.push({ name: rule, description });
      }
    }

    return specialRules;
  }, [army, core, rules]);

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
            dangerouslySetInnerHTML={{ __html: selectedRule?.description || '' }}
          />
        </Stack>
      </Modal>
    </div>
  );
};

export default UnitSpecialRules;
