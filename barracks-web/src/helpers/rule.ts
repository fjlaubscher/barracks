export const getArmyRuleDescription = (army: Barracks.Army, rule: string) => {
  const filteredRules = army.rules.filter((armyRule) =>
    rule.toLowerCase().includes(armyRule.name.toLowerCase())
  );

  return filteredRules.length ? filteredRules[0].description : undefined;
};

export const getCoreRuleDescription = (core: Barracks.Core, rule: string) => {
  let description: string | undefined = undefined;

  const ruleTypes = Object.keys(core.rules);
  for (let i = 0; i < ruleTypes.length; i++) {
    const ruleType = ruleTypes[i];
    const filteredRules = core.rules[ruleType].filter((coreRule) =>
      rule.toLowerCase().includes(coreRule.name.toLowerCase())
    );

    if (filteredRules.length) {
      description = filteredRules[0].description;
      break;
    }
  }

  return description;
};

export const buildRulesWithDescriptions = (
  army: Barracks.Army,
  core: Barracks.Core,
  rules: string[]
): Barracks.Item[] =>
  rules.map((rule) => {
    const hasOwnDescription = rule.includes(':');

    if (hasOwnDescription) {
      const [name, description] = rule.split(':');
      return { name, description };
    } else {
      // try to find the rule in core data
      let description = getCoreRuleDescription(core, rule);

      if (!description) {
        // still nothing, check the army rules
        description = getArmyRuleDescription(army, rule);
      }

      if (!description) {
        // still no description
        description = 'Rule description not found.';
      }

      return { name: rule, description };
    }
  });
