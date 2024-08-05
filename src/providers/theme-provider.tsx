'use client';

import React, { createContext, ReactNode, useState } from 'react';
import { IThemeContext } from '../interfaces.ts';

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: (theme: string) => theme,
});

export default function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
