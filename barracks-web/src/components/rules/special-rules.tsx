import { useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Modal, Stack, TagGroup, Tag, IconButton } from '@fjlaubscher/matter';

import styles from './rules.module.scss';

interface Props {
  className?: string;
  core?: Barracks.Core;
  rules: string[];
}

const SpecialRules = ({ className, core, rules }: Props) => {
  const [selectedRule, setSelectedRule] = useState<Barracks.Item | undefined>(undefined);

  const parsedRules: Barracks.Item[] = useMemo(() => {
    if (core) {
      const specialRules: Barracks.Item[] = [];

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];

        if (rule.includes(':')) {
          // rule includes a description
          const [name, description] = rule.split(':');
          specialRules.push({ name, description });
        } else {
          // find the rule in core data
          let description = '';
          const ruleTypes = Object.keys(core.rules);

          for (let t = 0; t < ruleTypes.length; t++) {
            const filteredRules = core.rules[ruleTypes[t]].filter((coreRule) =>
              rule.toLowerCase().includes(coreRule.name.toLowerCase())
            );

            if (filteredRules.length) {
              description = filteredRules[0].description;
              break;
            }
          }

          // finally, check the army rules
          if (!description) {
          }

          specialRules.push({ name: rule, description });
        }
      }

      return specialRules;
    }

    return [];
  }, [core, rules]);

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

export default SpecialRules;
