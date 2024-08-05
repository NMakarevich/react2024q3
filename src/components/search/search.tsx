import React, { useEffect, useState } from 'react';
import { ChangeEvent, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import { setSearchTerm } from '../../redux/slices/cards.slice.ts';
import { ThemeContext } from '../../providers/theme-provider.tsx';

export default function Search(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchT] = useState(getSearchTerm);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, []);

  function handleInput(e: ChangeEvent) {
    let inputValue = '';
    if (e.target instanceof HTMLInputElement) inputValue = e.target.value;
    setSearchT(inputValue);
  }

  function getSearchTerm() {
    return searchParams.get('q');
  }

  function search() {
    if (getSearchTerm() !== searchTerm) {
      const params = new URLSearchParams();
      params.set('q', searchTerm || '');
      params.set('page', '1');
      router.push(`/search?${params.toString()}`);
      dispatch(setSearchTerm(searchTerm));
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
          defaultValue={searchTerm || ''}
          onChange={handleInput}
        />
        <button className={'search-button'} type="button" onClick={search}>
          Search
        </button>
      </div>
    </>
  );
}
