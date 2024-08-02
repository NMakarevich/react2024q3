import React, { useEffect, useState } from 'react';
import { ChangeEvent, useContext } from 'react';
import {
  PageContext,
  ThemeContext,
  IPageContext,
  IThemeContext,
} from '../../App.tsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import {
  selectSearchTerm,
  setSearchTerm,
} from '../../redux/slices/cards.slice.ts';

const SEARCH_TERM = 'search-term';

export default function Search(): React.ReactNode {
  const [ls, updateLocalStorage] = useLocalStorage(SEARCH_TERM);
  const [searchT, setSearchT] = useState(ls);
  const { setPage } = useContext(PageContext) as IPageContext;
  const { theme } = useContext(ThemeContext) as IThemeContext;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector(selectSearchTerm);

  useEffect(() => {
    dispatch(setSearchTerm(ls));
  }, []);

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchT(inputValue);
  }

  function search() {
    if (ls !== searchT) {
      updateLocalStorage(searchT);
      setPage(1);
      router.push('/search?page=1');
      dispatch(setSearchTerm(searchT));
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
