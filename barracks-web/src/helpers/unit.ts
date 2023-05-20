export const calculateCost = (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) =>
  listUnit.options.reduce(
    (total, unitOption): number =>
      total + unitOption.option.cost[listUnit.veterancy] * unitOption.amount,
    listUnit.profile.cost[listUnit.veterancy]
  );

export const getColorFromVeterancy = (veterancy: string) => {
  switch (veterancy) {
    case 'inexperienced':
      return 'error';
    case 'regular':
      return 'accent';
    case 'veteran':
      return 'success';
  }
};
