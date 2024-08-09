import React, { ChangeEvent, useContext, useState } from 'react';
import './search.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ThemeContext } from '../../providers/theme.provider';
import { useSearchParams, useNavigate } from '@remix-run/react';
import { PageContext } from '../../providers/page.provider';

const SEARCH_TERM = 'search-term';

export default function Search(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const [ls, updateLocalStorage] = useLocalStorage(SEARCH_TERM);
  const [searchTerm, setSearchTerm] = useState(getSearchTerm);
  const { theme } = useContext(ThemeContext);
  const { setPage } = useContext(PageContext);
  const navigate = useNavigate();

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchTerm(inputValue);
  }

  function getSearchTerm() {
    let searchQuery = '';
    if (searchParams.get('q')) {
      searchQuery = searchParams.get('q') || '';
    } else if (typeof window !== 'undefined') {
      searchQuery = ls ? ls : '';
    }
    return searchQuery;
  }

  function search() {
    if (getSearchTerm() !== searchTerm) {
      const params = new URLSearchParams();
      params.set('q', searchTerm || '');
      params.set('page', '1');
      setPage(1);
      if (typeof window !== 'undefined') {
        updateLocalStorage(searchTerm);
      }
      navigate({ pathname: '/search', search: params.toString() });
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
