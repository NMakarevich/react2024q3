import React from 'react';
import Search from '../components/search/search.tsx';
import { ToggleTheme } from '../components/toogle-theme/toggle-theme.tsx';
import { Metadata } from 'next';

import '../index.css';
import '../scss/colors.scss';
import '../scss/themes.scss';
import '../App.scss';
import '../components/flyout/flyout.scss';
import '../components/loader/loader.scss';
import '../components/pagination/pagination.scss';
import '../components/results-item/results-item.scss';
import '../components/results-list/results-list.scss';
import '../components/search/search.scss';
import '../components/toogle-theme/toggle-theme.scss';
import '../components/not-found/not-found.scss';
import '../components/detailed-card/detailed-card.scss';
import GlobalProvider from '../providers/global.provider.tsx';

export const metadata: Metadata = {
  title: 'Next App',
  icons: {
    icon: '../../public/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <GlobalProvider>
          <header className={`app-header`}>
            <h1>Search repository on GitHub</h1>
            <Search />
            <ToggleTheme />
          </header>
          <main className={`app-main`}>{children}</main>
        </GlobalProvider>
      </body>
    </html>
  );
}
