import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Search from './components/search/search.tsx';
import ResultsList from './components/results-list/results-list.tsx';
import { ToggleTheme } from './components/toogle-theme/toggle-theme.tsx';
import { useGetCardsQuery } from './redux/slices/api.slice.ts';

import {
  startLoading,
  finishLoading,
  updatePage,
  addCards,
  selectSearchTerm,
} from './redux/slices/cards.slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store.ts';
import { Flyout } from './components/flyout/flyout.tsx';
import { useSearchParams } from 'next/navigation';

export interface Result {
  created_at: string;
  description: string;
  full_name: string;
  html_url: string;
  id: number;
  language: string;
  name: string;
  stargazers_count: number;
  topics: string[];
  owner: {
    avatar_url: string;
    id: number;
    login: string;
    html_url: string;
  };
}

export interface Response {
  total_count: number;
  items: Result[];
}

export interface IPageContext {
  page: number;
  setPage: (page: number) => void;
}

export interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const PageContext = createContext<IPageContext>({
  page: 1,
  setPage: (page: number) => page,
});

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: (theme: string) => theme,
});

export default function App({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(getPageFromURL);
  const [theme, setTheme] = useState('light');
  const searchTerm = useSelector(selectSearchTerm);
  const { data: res, isFetching } = useGetCardsQuery({
    searchTerm,
    page: page,
  });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    isFetching ? dispatch(startLoading()) : dispatch(finishLoading());
    if (!isFetching && res) dispatch(addCards(res.items));
  }, [isFetching]);

  useEffect(() => {
    setPage(parseInt(searchParams.get('page') || '1'));
  }, [searchParams]);

  useEffect(() => {
    dispatch(updatePage(page));
  }, [page]);

  function getPageFromURL() {
    return parseInt(searchParams.get('page') || '1');
  }

  return (
    <>
      <PageContext.Provider
        value={{
          page,
          setPage,
        }}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <header className={`app-header theme-${theme}`}>
            <h1>Search repository on GitHub</h1>
            <Search></Search>
            <ToggleTheme />
          </header>
          <main className={`app-main theme-${theme}`}>
            {res && <ResultsList response={res}></ResultsList>}
            {children}
            <Flyout />
          </main>
        </ThemeContext.Provider>
      </PageContext.Provider>
    </>
  );
}
