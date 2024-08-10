import { ReactNode } from 'react';
import PageProvider from '../providers/page.provider';
import ThemeProvider from '../providers/theme.provider';
import SelectedItemsProvider from '../providers/selected-items.provider';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <PageProvider>
      <ThemeProvider>
        <SelectedItemsProvider>{children}</SelectedItemsProvider>
      </ThemeProvider>
    </PageProvider>
  );
}
