import { createContext, useContext, useState, type ReactNode } from 'react';

type ThemeProviderProps = { children: ReactNode };

type ThemeContext = {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
}

const ThemeContext = createContext({} as ThemeContext);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const toggleDarkTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};