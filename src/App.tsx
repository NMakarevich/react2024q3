import { useState } from 'react';
import './App.scss';
import Search from './components/search/search.tsx';
import ResultsList from './components/results-list/results-list.tsx';

export interface Results {
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
  items: Results[];
}

export default function App() {
  const [response, setResponse] = useState<Response>({
    total_count: 0,
    items: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  function changeLoading(isLoading: boolean) {
    setLoading(isLoading);
  }

  function getResponse(response: Response) {
    setResponse({ ...response });
  }

  return (
    <>
      <header className={'app-header'}>
        <h1>Search repository on GitHub</h1>
        <Search setLoading={changeLoading} sendResponse={getResponse}></Search>
      </header>
      <main className={'app-main'}>
        <ResultsList response={response} loading={loading}></ResultsList>
      </main>
    </>
  );
}
