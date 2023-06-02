export const calculateCost = (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) =>
  listUnit.options.reduce(
    (total, unitOption): number =>
      total + unitOption.option.cost[listUnit.veterancy] * unitOption.amount,
    listUnit.profile.cost[listUnit.veterancy]
  );
