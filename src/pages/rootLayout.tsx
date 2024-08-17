import React from 'react';
import Search from '../components/search/search.tsx';
import { ToggleTheme } from '../components/toogle-theme/toggle-theme.tsx';
import { Flyout } from '../components/flyout/flyout.tsx';
import ThemeProvider from '../providers/theme.provider.tsx';
import { store } from '../redux/store.ts';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <header className={`app-header`}>
            <h1>Search repository on GitHub</h1>
            <Search></Search>
            <ToggleTheme />
          </header>
          <main className={`app-main`}>
            {children}
            <Flyout />
          </main>
        </ThemeProvider>
      </Provider>
    </>
  );
}
