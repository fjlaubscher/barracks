export const BANNER_IMAGES = [
  {
    url: '/banner/ambush.jpg',
    name: 'Ambush'
  },
  {
    url: '/banner/bagramyans-breakthrough.jpg',
    name: "Bagramyan's Breakthrough"
  },
  {
    url: '/banner/bloody-ridge.jpg',
    name: 'Bloody Ridge'
  },
  {
    url: '/banner/dobrosli-airstrip.jpg',
    name: 'Dobrosli Airstrip'
  },
  {
    url: '/banner/el-alamein.jpg',
    name: 'El Alamein'
  },
  {
    url: '/banner/fort-nibeiwa.jpg',
    name: 'Fort Nibeiwa'
  },
  {
    url: '/banner/glider-troops.jpg',
    name: 'Glider Troops'
  },
  {
    url: '/banner/red-october-steel-plant.jpg',
    name: 'Red October Steel Plant'
  },
  {
    url: '/banner/stalingrad.jpg',
    name: 'Stalingrad'
  },
  {
    url: '/banner/the-factory.jpg',
    name: 'The Factory'
  }
];

export const DEFAULT_SETTINGS: Barracks.Settings = {
  primaryColor: '#426f6f',
  accentColor: '#32cd8c',
  banner: 0
};

export const overrideStyles = (settings: Barracks.Settings) => {
  const styles = document.createElement('style');
  styles.setAttribute('type', 'text/css');
  styles.textContent = `:root { --color-primary: ${settings.primaryColor}; --color-accent: ${settings.accentColor}; }`;

  document.head.appendChild(styles);
};
