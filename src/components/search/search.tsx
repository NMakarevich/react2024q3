import { ChangeEvent, useEffect, useState } from 'react';
import { Response } from '../../App.tsx';
import { BASE_URL, PER_PAGE, SECOND_URL } from '../../consts.tsx';
import './search.scss';

interface Props {
  setLoading: (isLoading: boolean) => void;
  sendResponse: (results: Response) => void;
}

const SEARCH_TERM = 'search-term';

export default function Search(props: Props) {
  const { setLoading, sendResponse } = props;

  const [searchTerm, setSearchTerm] = useState(getSearchTermFromLS);

  useEffect(() => {
    search();
    return () => {};
  }, []);

  function getSearchTermFromLS() {
    return localStorage.getItem(SEARCH_TERM) || '';
  }

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchTerm(inputValue);
  }

  function search() {
    localStorage.setItem(SEARCH_TERM, searchTerm);
    setLoading(true);
    const url = searchTerm
      ? `${BASE_URL}?q=${encodeURIComponent(searchTerm)}`
      : `${SECOND_URL}`;
    fetch(`${url}&per_page=${PER_PAGE}&page=1`)
      .then((res) => res.json())
      .then((res: Response) => {
        setLoading(false);
        sendResponse(res);
      });
  }

  return (
    <>
      <div className="search">
        <input
          className={'search-input'}
          type="text"
          name="search"
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
