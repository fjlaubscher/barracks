export const calculateCost = (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) =>
  listUnit.options.reduce(
    (total, unitOption): number =>
      total + unitOption.option.cost[listUnit.veterancy] * unitOption.amount,
    listUnit.profile.cost[listUnit.veterancy]
  );

export const getColorFromVeterancy = (veterancy: string) => {
  switch (veterancy) {
    case 'inexperienced':
      return 'warning';
    case 'regular':
      return 'info';
    case 'veteran':
      return 'success';
  }
};
