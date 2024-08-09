import { createContext, ReactNode, useState } from 'react';

export interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: (theme: string) => theme,
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
