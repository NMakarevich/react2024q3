import React from 'react';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { PageContext, Response } from '../../App.tsx';
import './search.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { getCards } from '../../api.ts';

interface Props {
  setLoading: (isLoading: boolean) => void;
  sendResponse: (results: Response) => void;
}

const SEARCH_TERM = 'search-term';

export default function Search(props: Props): React.ReactNode {
  const { setLoading, sendResponse } = props;
  const [ls, updateLocalStorage] = useLocalStorage(SEARCH_TERM);
  const [searchTerm, setSearchTerm] = useState(ls);
  const pageContext = useContext(PageContext);

  useEffect(() => {
    search().then(() => setLoading(false));
    return () => {};
  }, [pageContext]);

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchTerm(inputValue);
  }

  async function search() {
    updateLocalStorage(searchTerm);
    setLoading(true);
    const results = await getCards(searchTerm, pageContext);
    sendResponse(results);
  }

  return (
    <>
      <div className="search">
        <input
          className={'search-input'}
          type="text"
          name="search"
          aria-label="search-input"
          defaultValue={searchTerm}
          onChange={handleInput}
        />
        <button className={'search-button'} type="button" onClick={search}>
          Search
        </button>
      </div>
    </>
  );
}
