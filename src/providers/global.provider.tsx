import { ReactNode } from 'react';
import ThemeProvider from './theme.provider.tsx';
import PageProvider from './page.provider.tsx';

export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <PageProvider>{children}</PageProvider>
    </ThemeProvider>
  );
}
