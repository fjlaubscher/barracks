export const ARMY_NAME_MAPPING: { [key: string]: string } = {
  germany: 'Germany',
  us: 'United States',
  'great-britain': 'Great Britain',
  'soviet-union': 'Soviet Union',
  'imperial-japan': 'Imperial Japan'
};

export const LIST_UNITS_TEMPLATE: Barracks.List.Units = {
  infantry: {
    Headquarters: [],
    'Infantry Squads and Teams': []
  },
  artillery: {
    'Field Artillery': [],
    'Anti-Tank Guns': [],
    'Anti-Aircraft Guns': []
  },
  vehicles: {
    Tanks: [],
    'Tank Destroyers': [],
    'Self-Propelled Artillery': [],
    'Anti-Aircraft Vehicles': [],
    'Armoured Cars': [],
    'Transports and Tows': []
  }
};
