export type ThemeOptions = "light" | "dark";

const themeKey = "THEME_TYPE";

export function getSavedTheme(): ThemeOptions {
  const result = localStorage.getItem(themeKey);
  if (result == null) return 'light';
  return result as ThemeOptions;
}

export function saveTheme(theme: ThemeOptions) {
  localStorage.setItem(themeKey, theme);
  console.log(`stored theme as ${theme}`);
}