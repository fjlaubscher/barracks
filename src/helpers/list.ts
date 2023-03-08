export const calculateOrderDice = (list: Barracks.List) => {
  let orderDice = 0;

  if (list) {
    Object.keys(list.units).forEach((type) =>
      Object.keys(list.units[type]).forEach((role) => (orderDice += list.units[type][role].length))
    );
  }

  return orderDice;
};
