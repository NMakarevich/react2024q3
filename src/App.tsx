import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import Search from './components/search/search.tsx';
import ResultsList from './components/results-list/results-list.tsx';
import { Outlet, useSearchParams } from 'react-router-dom';
import { ToggleTheme } from './components/toogle-theme/toggle-theme.tsx';

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

export const PageContext = createContext<IPageContext | null>(null);

export const ThemeContext = createContext<IThemeContext | null>(null);

export default function App(): React.ReactNode {
  const [response, setResponse] = useState<Response>({
    total_count: 0,
    items: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(getPageFromURL);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  function getPageFromURL() {
    return parseInt(searchParams.get('page') || '1');
  }

  function changeLoading(isLoading: boolean) {
    setLoading(isLoading);
  }

  function getResponse(response: Response) {
    setResponse({ ...response });
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
            <Search
              setLoading={changeLoading}
              sendResponse={getResponse}
            ></Search>
            <ToggleTheme />
          </header>
          <main className={`app-main theme-${theme}`}>
            <ResultsList response={response} loading={loading}></ResultsList>
            <Outlet />
          </main>
        </ThemeContext.Provider>
      </PageContext.Provider>
    </>
  );
}
