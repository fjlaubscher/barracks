export const DEFAULT_SETTINGS: Barracks.Settings = {
  primaryColor: '#426f6f',
  accentColor: '#32cd8c'
};

export const overrideStyles = (
  settings: Pick<Barracks.Settings, 'primaryColor' | 'accentColor'>
) => {
  const styles = document.createElement('style');
  styles.setAttribute('type', 'text/css');
  styles.textContent = `:root { --color-primary: ${settings.primaryColor}; --color-accent: ${settings.accentColor}; }`;

  document.head.appendChild(styles);
};
