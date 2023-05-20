export const DEFAULT_THEME: Barracks.Theme = {
  primaryColor: '#ea7317',
  accentColor: '#fe5e41',
  mode: 'system'
};

export const overrideStyles = (theme: Omit<Barracks.Theme, 'mode'>) => {
  const styles = document.createElement('style');
  styles.setAttribute('type', 'text/css');
  styles.textContent = `:root { --color-primary: ${theme.primaryColor}; --color-accent: ${theme.accentColor}; }`;

  document.head.appendChild(styles);
};
