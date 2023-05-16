import { capitalize, slugify } from '@fjlaubscher/matter';

import { ARMY_NAME_MAPPING } from './data';
import { SETTINGS } from '../data/storage';
import { DEFAULT_SETTINGS } from '../data/settings';

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
    text += `${window.location.protocol}//${window.location.host}/public-list/${list.key}`;
  }

  return text;
};

const renderListToCanvas = (list: Barracks.List): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const totalOrderDice = calculateOrderDice(list);
    const storedSettings = localStorage.getItem(SETTINGS);
    const settings: Barracks.Settings = storedSettings
      ? JSON.parse(storedSettings)
      : DEFAULT_SETTINGS;

    const heightByOrderDice = totalOrderDice * 90;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.width = 600;
    canvas.height = heightByOrderDice > 600 ? heightByOrderDice : 600;
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

      context.textAlign = 'right';
      context.fillText(`${list.points} pts`, canvas.width - padding, lastY);
      context.textAlign = 'left';
      lastY += 24;

      context.font = '14px Roboto';
      context.fillStyle = '#b0b0b0';
      context.fillText(ARMY_NAME_MAPPING[list.army], padding, lastY);

      context.textAlign = 'right';
      context.fillText(`${totalOrderDice} Order Dice`, canvas.width - padding, lastY);
      context.textAlign = 'left';
      lastY += 20;

      Object.keys(list.units).forEach((type) => {
        Object.keys(list.units[type]).forEach((role) => {
          if (list.units[type][role].length > 0) {
            context.fillStyle = settings.primaryColor;
            context.fillRect(0, lastY, canvas.width, 48);
            lastY += 32;

            context.font = '24px Roboto';
            context.fillStyle = '#fafafa';
            context.textAlign = 'left';
            context.fillText(role, padding, lastY);
            lastY += 48;

            context.font = '18px Roboto';
            context.fillStyle = '#fafafa';
            list.units[type][role].forEach((unit, index) => {
              context.textAlign = 'left';
              context.fillText(capitalize(unit.veterancy), padding, lastY);

              const profileWidth = context.measureText(unit.profile.name).width;
              const center = canvas.width / 2 - profileWidth / 2;
              context.fillText(unit.profile.name, center, lastY);

              context.textAlign = 'right';
              context.fillText(`${unit.points} pts`, canvas.width - padding, lastY);

              if (index < list.units[type][role].length - 1) {
                lastY += 40;
              } else {
                lastY += 20;
              }
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

export const createPublicList = async (input: Barracks.PublicList) => {
  const response = await fetch(import.meta.env.VITE_WORKER_URL, {
    method: 'POST',
    body: JSON.stringify(input)
  });

  if (response.ok) {
    const data = await response.json();
    if (data) {
      return data as Barracks.PublicList;
    }
  }

  return undefined;
};

export const getPublicLists = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/lists/${username}`, {
    method: 'GET'
  });

  if (response.ok) {
    const data = await response.json();
    if (data) {
      return data as Barracks.PublicList[];
    }
  }

  return undefined;
};

export const getPublicList = async (slug: string) => {
  const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/${slug}`, { method: 'GET' });

  if (response.ok) {
    const data = await response.json();
    if (data) {
      return data as Barracks.PublicList;
    }
  }

  return undefined;
};

export const deletePublicList = async (slug: string) => {
  const response = await fetch(`${import.meta.env.VITE_WORKER_URL}/${slug}`, { method: 'DELETE' });
  return response.ok;
};
