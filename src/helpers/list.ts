import { ARMY_NAME_MAPPING } from './data';
import { capitalize, slugify } from './text';
import { SETTINGS } from './storage';
import { DEFAULT_SETTINGS } from './settings';

export const calculateOrderDice = (list: Barracks.List) => {
  let orderDice = 0;

  if (list) {
    Object.keys(list.units).forEach((type) =>
      Object.keys(list.units[type]).forEach((role) => (orderDice += list.units[type][role].length))
    );
  }

  return orderDice;
};

export const buildTextList = (list: Barracks.List): string => {
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

const renderListToCanvas = (list: Barracks.List): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const totalOrderDice = calculateOrderDice(list);
    const storedSettings = localStorage.getItem(SETTINGS);
    const settings: Barracks.Settings = storedSettings
      ? JSON.parse(storedSettings)
      : DEFAULT_SETTINGS;

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 600;
    canvas.height = totalOrderDice * 62;
    const context = canvas.getContext('2d');

    if (context) {
      const padding = 16;
      let lastY = 36;
      // background
      context.fillStyle = '#282828';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // header
      context.font = '28px Roboto';
      context.fillStyle = settings.accentColor;
      context.fillText(list.name, padding, lastY);

      canvas.setAttribute('dir', 'rtl');
      context.fillText(`${list.points}pts`, canvas.width - padding, lastY);
      canvas.setAttribute('dir', 'ltr');
      lastY += 24;

      context.font = '14px Roboto';
      context.fillStyle = '#b0b0b0';
      context.fillText(capitalize(list.army), padding, lastY);

      canvas.setAttribute('dir', 'rtl');
      context.fillText(`${totalOrderDice} :Order Dice`, canvas.width - padding, lastY);
      canvas.setAttribute('dir', 'ltr');
      lastY += 20;

      Object.keys(list.units).forEach((type) => {
        Object.keys(list.units[type]).forEach((role) => {
          if (list.units[type][role].length > 0) {
            context.fillStyle = settings.primaryColor;
            context.fillRect(0, lastY, canvas.width, 48);
            lastY += 32;

            context.font = '24px Roboto';
            context.fillStyle = '#fafafa';
            context.fillText(role, padding, lastY);
            lastY += 48;

            context.font = '18px Roboto';
            context.fillStyle = '#fafafa';
            list.units[type][role].forEach((unit) => {
              let text = `(${capitalize(unit.veterancy)}) ${unit.profile.name} - ${unit.points}`;
              context.fillText(text, padding, lastY);
              lastY += 26;
            });
          }
        });
      });

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject('Unable to save canvas');
        }
      });
    } else {
      reject('Unable to render to canvas.');
    }
  });

interface ShareResult {
  method: 'navigator' | 'download';
  success: boolean;
}

export const shareListImage = async (list: Barracks.List) => {
  let result: ShareResult = {
    method: 'navigator',
    success: false
  };

  try {
    const blob = await renderListToCanvas(list);
    const shareData: ShareData = {
      title: list.name,
      files: [new File([blob], `${slugify(list.name)}.png`, { type: 'image/png' })]
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      result.method = 'navigator';
      result.success = true;
    } else {
      const blobURL = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobURL;
      anchor.download = `${slugify(list.name)}.png`;
      anchor.click();

      URL.revokeObjectURL(blobURL);
      result.method = 'download';
      result.success = true;
    }
  } catch (ex: any) {
    result.success = false;
  }

  return result;
};
