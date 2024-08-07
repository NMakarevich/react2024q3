'use client';

import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '../../providers/theme.provider.tsx';

export function ToggleTheme(): React.ReactNode {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggleTheme() {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  useEffect(() => {
    if (!document.body.classList.contains(`theme-${theme}`)) {
      document.body.classList.add(`theme-${theme}`);
    }
    theme === 'dark'
      ? document.body.classList.replace('theme-light', 'theme-dark')
      : document.body.classList.replace('theme-dark', 'theme-light');
  }, [theme]);

  return (
    <div className={`toggle-theme theme-${theme}`}>
      <label
        className={`toggle-theme_label theme-${theme}`}
        htmlFor="theme-light"
      >
        Light
      </label>
      <input
        className={`toggle-theme_radio theme-${theme}`}
        type="radio"
        name="toggle-theme"
        id="theme-light"
        onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}
        checked={theme === 'light'}
      />
      <span
        className={`toggle-theme_container theme-${theme}`}
        onClick={toggleTheme}
      ></span>
      <input
        className={`toggle-theme_radio theme-${theme}`}
        type="radio"
        name="toggle-theme"
        id="theme-dark"
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />
      <label
        className={`toggle-theme_label theme-${theme}`}
        htmlFor="theme-dark"
      >
        Dark
      </label>
    </div>
  );
}
