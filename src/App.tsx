import { useEffect, useState } from 'react';
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
  owner: {
    avatar_url: string;
    id: number;
    login: string;
    url: string;
  };
}

export default function App() {
  const [results, setResults] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorClicked, setErrorClicked] = useState<boolean>(false);

  useEffect(() => {
    if (errorClicked) throw new Error('Error button is clicked');
    return () => {};
  }, [errorClicked]);

  function handleClick() {
    setErrorClicked(true);
  }

  function changeLoading(isLoading: boolean) {
    setLoading(isLoading);
  }

  function getResults(results: Results[]) {
    setResults([...results]);
  }

  return (
    <>
      <header className={'app-header'}>
        <h1>Search repository on GitHub</h1>
        <Search setLoading={changeLoading} sendResults={getResults}></Search>
        <button type={'button'} onClick={handleClick}>
          Throw error
        </button>
      </header>
      <main className={'app-main'}>
        <ResultsList results={results} loading={loading}></ResultsList>
      </main>
    </>
  );
}
