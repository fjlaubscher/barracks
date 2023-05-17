import { capitalize } from '@fjlaubscher/matter';

import { ARMY_NAME_MAPPING } from './data';

export const calculateOrderDice = (list?: Barracks.List) => {
  let orderDice = 0;

  if (list) {
    Object.keys(list.units).forEach((type) =>
      Object.keys(list.units[type]).forEach((role) => (orderDice += list.units[type][role].length))
    );
  }

  return orderDice;
};

export const buildTextList = (list?: Barracks.List): string => {
  if (!list) return '';

  let text = `*${ARMY_NAME_MAPPING[list.army]} - ${list.name}*\n_${calculateOrderDice(
    list
  )} Order Dice / ${list.points} pts_\n\n`;

  Object.keys(list.units).forEach((type) => {
    Object.keys(list.units[type]).forEach((role) => {
      if (list.units[type][role].length > 0) {
        text += `*${capitalize(role)}*\n`;

        list.units[type][role].forEach((unit) => {
          if (unit.unit.name === unit.profile.name) {
            text += `${unit.profile.name} - ${unit.points} pts\n`;
          } else {
            text += `${unit.unit.name}: ${unit.profile.name} - ${unit.points} pts\n`;
          }

          text += `- ${capitalize(unit.veterancy)}\n`;

          if (unit.options.length > 0) {
            text += unit.options.map((o) => `- ${o.amount} x ${o.option.name}`).join('\n');
            text += '\n';
          }

          text += '\n';
        });
      }
    });
  });

  if (list.public) {
    text += `${window.location.protocol}//${window.location.host}/list/${list.key}`;
  }

  return text;
};
