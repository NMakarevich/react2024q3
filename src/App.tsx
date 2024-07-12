import { createContext, useEffect, useState } from 'react';
import './App.scss';
import Search from './components/search/search.tsx';
import ResultsList from './components/results-list/results-list.tsx';
import { useLocation, useSearchParams } from 'react-router-dom';

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
    url: string;
  };
}

export interface Response {
  total_count: number;
  items: Result[];
}

export const PageContext = createContext(1);

export default function App() {
  const [response, setResponse] = useState<Response>({
    total_count: 0,
    items: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(getPageFromURL);
  const location = useLocation();

  useEffect(() => {
    if (searchParams.get('page')) setPage(getPageFromURL);
    if (!searchParams.get('page') && !location.pathname.includes('details'))
      setSearchParams({ page: page.toString() });
  }, [location]);

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
      <PageContext.Provider value={page}>
        <header className={'app-header'}>
          <h1>Search repository on GitHub</h1>
          <Search
            setLoading={changeLoading}
            sendResponse={getResponse}
          ></Search>
        </header>
        <main className={'app-main'}>
          <ResultsList response={response} loading={loading}></ResultsList>
        </main>
      </PageContext.Provider>
    </>
  );
}
