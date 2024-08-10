import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import AppProviders from './src/providers/app-providers.provider';
import Search from './src/components/search/search';
import { ToggleTheme } from './src/components/toogle-theme/toggle-theme';
import React from 'react';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <Meta />
        <Links />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root">
          <AppProviders>
            <header className={`app-header`}>
              <h1>Search repository on GitHub</h1>
              <Search />
              <ToggleTheme />
            </header>
            <main className={`app-main`}>
              <Outlet />
            </main>
          </AppProviders>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
