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
            text += `${unit.profile.name}\n`;
          } else {
            text += `${unit.unit.name}: ${unit.profile.name}\n`;
          }

          text += `${capitalize(unit.veterancy)} | ${unit.points} pts\n`;

          if (unit.options.length > 0) {
            text += unit.options.map((o) => `- ${o.amount} x ${o.option.name}`).join('\n');
            text += '\n';
          }

          text += '\n';
        });
      }
    });
  });

  return text;
};

export const shareList = async (list?: Barracks.List) => {
  const listUrl = list
    ? `${window.location.protocol}//${window.location.host}/list/${list.key}`
    : undefined;
  const shareData: ShareData = {
    text: buildTextList(list),
    title: list ? `${ARMY_NAME_MAPPING[list.army]} - ${list.name}` : 'Army List',
    url: listUrl
  };
  if (navigator.canShare(shareData)) {
    await navigator.share(shareData);
  }
};
