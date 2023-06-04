export const calculateCost = (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) =>
  listUnit.options.reduce(
    (total, unitOption): number =>
      total + unitOption.option.cost[listUnit.veterancy] * unitOption.amount,
    listUnit.profile.cost[listUnit.veterancy]
  );

export const transformToListUnit = (
  unit: Barracks.Unit,
  profileIndex = 0,
  veterancyIndex = 0,
  selectedOptions: { [key: number]: number } = {}
): Barracks.List.Unit => {
  const profile = unit.profiles[profileIndex];
  const veterancy = Object.keys(profile.cost)[veterancyIndex];
  const options = Object.keys(selectedOptions).map((key) => {
    const index = parseInt(key);
    const amount = selectedOptions[index];
    const option = unit.options[index];

    return { option, amount } as Barracks.List.UnitOption;
  });

  return {
    key: '',
    unit,
    options,
    profile,
    points: 0,
    veterancy
  };
};
