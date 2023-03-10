import { ARMY_NAME_MAPPING } from './data';
import { capitalize } from './text';

export const calculateOrderDice = (list: Barracks.List) => {
  let orderDice = 0;

  if (list) {
    Object.keys(list.units).forEach((type) =>
      Object.keys(list.units[type]).forEach((role) => (orderDice += list.units[type][role].length))
    );
  }

  return orderDice;
};

const buildTextList = (list: Barracks.List): string => {
  let text = `*${ARMY_NAME_MAPPING[list.army]} - ${list.name}*\nPoints: ${
    list.points
  }\nOrder Dice: ${calculateOrderDice(list)}\n\n`;

  Object.keys(list.units).forEach((type) => {
    Object.keys(list.units[type]).forEach((role) => {
      if (list.units[type][role].length > 0) {
        text += `*${capitalize(role)}*\n`;

        list.units[type][role].forEach((unit) => {
          if (unit.unit.name === unit.profile.name) {
            text += `${unit.profile.name} - ${unit.points}\n`;
          } else {
            text += `${unit.unit.name}: ${unit.profile.name} - ${unit.points}\n`;
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

  return text;
};

interface ShareResult {
  method: 'navigator' | 'clipboard';
  success: boolean;
}

export const shareList = async (list: Barracks.List) => {
  let result: ShareResult = {
    method: 'navigator',
    success: false
  };

  const text = buildTextList(list);

  try {
    const shareData: ShareData = {
      title: list.name,
      url: window.location.origin,
      text
    };

    if (!navigator.canShare || !navigator.canShare(shareData)) {
      await navigator.clipboard.writeText(text);
      result.method = 'clipboard';
      result.success = true;
    } else {
      await navigator.share(shareData);
      result.method = 'navigator';
      result.success = true;
    }
  } catch (ex: any) {
    result.success = false;
  }

  return result;
};
