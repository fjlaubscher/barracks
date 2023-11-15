export const calculateCost = (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) => {
  const containsFreeUnit =
    listUnit.options.filter((o) => o.option.name.toLowerCase() === 'free unit' && o.amount === 1)
      .length === 1;

  return containsFreeUnit
    ? 0
    : listUnit.options.reduce(
        (total, unitOption): number =>
          total + unitOption.option.cost[listUnit.veterancy] * unitOption.amount,
        listUnit.profile.cost[listUnit.veterancy]
      );
};

export const buildListUnitComposition = (listUnit: Barracks.List.Unit) => {
  if (!listUnit.unit.composition) {
    return undefined;
  }

  const hasUnitLeader = listUnit.unit.composition.description.includes('and');

  if (hasUnitLeader) {
    // some armies include "Additional Soldier" with various equipment, all of those should be accumulated
    const totalAdditionalSoldiers = listUnit.options
      .filter((o) => o.option.name.toLowerCase().includes('additional soldier'))
      .reduce((total, option) => total + option.amount, 0);
    const attendants = listUnit.options.filter(
      (o) => o.option.name.toLowerCase() === 'attendant'
    )[0];
    const unitLeader = listUnit.unit.composition.description.split('and')[0].trim();
    const soldiers = listUnit.unit.composition.baseSize || 0;
    const totalSoldiers = soldiers + totalAdditionalSoldiers + (attendants?.amount || 0);

    if (attendants?.amount) {
      return `${unitLeader} and ${
        totalSoldiers > 1 ? `${totalSoldiers} attendants` : '1 attendant'
      }`;
    } else if (totalAdditionalSoldiers || soldiers) {
      return `${unitLeader} and ${totalSoldiers > 1 ? `${totalSoldiers} soldiers` : '1 soldier'}`;
    } else {
      return unitLeader;
    }
  } else {
    return listUnit.unit.composition?.description;
  }
};

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
