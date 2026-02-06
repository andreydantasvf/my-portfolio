export type Theme = 'zeus' | 'poseidon' | 'hades';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // Optional: cycles through themes
}
