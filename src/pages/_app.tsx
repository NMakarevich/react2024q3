import type { AppProps } from 'next/app';
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
import RootLayout from './rootLayout.tsx';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
