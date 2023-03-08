export const slugify = (input: string) => input.toLowerCase().replaceAll(' ', '-');

export const capitalize = (input: string) => input[0].toUpperCase() + input.slice(1);
