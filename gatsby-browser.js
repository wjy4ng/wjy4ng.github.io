require('typeface-montserrat');

const getInitialColorMode = () => {
  const persistedColorMode = window.localStorage.getItem('isDarkMode');
  const hasPersistedColorMode = typeof persistedColorMode === 'string';
  // If the user has explicitly chosen a theme
  if (hasPersistedColorMode) {
    return JSON.parse(persistedColorMode) ? 'dark' : 'light';
  }
  // If they haven't been explicit, check the media query
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  // default to dark mode
  return 'dark';
};

document.documentElement.setAttribute('data-theme', getInitialColorMode());
