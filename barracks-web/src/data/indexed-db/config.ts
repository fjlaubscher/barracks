export const DATABASE_NAME = 'BARRACKS';
export const DATABASE_VERSION = parseInt(
  import.meta.env.VITE_BARRACKS_VERSION.replace(/./g, '') || '0'
);

export const CORE_OBJECT_STORE = 'CORE';
export const ARMY_OBJECT_STORE = 'ARMY';
export const SPECIAL_RULES_OBJECT_STORE = 'SPECIAL_RULES';