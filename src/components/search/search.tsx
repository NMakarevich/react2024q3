import React from 'react';
import { ChangeEvent, useContext, useState } from 'react';
import {
  PageContext,
  ThemeContext,
  IPageContext,
  IThemeContext,
} from '../../App.tsx';
import './search.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';

interface Props {
  getSearchTerm: (searchTerm: string) => void;
}

const SEARCH_TERM = 'search-term';

export default function Search(props: Props): React.ReactNode {
  const [ls, updateLocalStorage] = useLocalStorage(SEARCH_TERM);
  const [searchTerm, setSearchTerm] = useState(ls);
  const { getSearchTerm } = props;
  const { setPage } = useContext(PageContext) as IPageContext;
  const { theme } = useContext(ThemeContext) as IThemeContext;

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchTerm(inputValue);
  }

  function search() {
    if (ls !== searchTerm) {
      updateLocalStorage(searchTerm);
      setPage(1);
      getSearchTerm(searchTerm);
    }
  }

  return (
    <>
      <div className={`search theme-${theme}`}>
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
