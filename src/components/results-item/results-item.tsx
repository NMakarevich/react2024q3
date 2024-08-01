import { PageContext, ThemeContext, Result } from '../../App.tsx';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { transformStars } from '../../utils.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemsIds } from '../../redux/slices/selected-items.slice.ts';
import { AppDispatch } from '../../redux/store.ts';
import {
  addItem,
  removeItem,
} from '../../redux/slices/selected-items.slice.ts';
import { useRouter } from 'next/navigation';

interface Props {
  result: Result;
}

export function ResultsItem(props: Props): React.ReactNode {
  const { result } = props;
  const router = useRouter();
  const { page } = useContext(PageContext);
  const { theme } = useContext(ThemeContext);
  const selectedItemsIds = useSelector(selectItemsIds);
  const dispatch: AppDispatch = useDispatch();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(selectedItemsIds.includes(result.id));
  }, [selectedItemsIds]);

  function navigateTo(event: React.MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLDivElement)
      router.push(
        `/search/details?owner=${result.owner.login}&name=${result.name}&page=${page}`,
      );
  }

  function toggleSelect(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    event.target.checked
      ? dispatch(addItem(result))
      : dispatch(removeItem(result.id));
  }

  return (
    <>
      <div
        className={`result theme-${theme}`}
        onClick={navigateTo}
        aria-label="result-item"
      >
        <div className={'result-left'}>
          <img
            className={'result-logo'}
            src={result.owner.avatar_url}
            alt={result.owner.login}
          />
          <div className={'result-info'}>
            <a className={'result-link link'} href={result.html_url}>
              <h2 className={'result-title'}>{result.name}</h2>
            </a>
            <div className={'result-author'}>
              <h3 className={'result-author_title'}>Author:</h3>
              <a
                className={'result-author_link link'}
                href={result.owner.html_url}
              >
                {result.owner.login}
              </a>
            </div>
          </div>
        </div>
        <div className={'result-right'}>
          <span className={'result-stars'}>
            Stars: {transformStars(result.stargazers_count)}
          </span>
        </div>
        <input
          type="checkbox"
          name="selected"
          className="selected-item"
          checked={isSelected}
          onChange={toggleSelect}
        />
      </div>
    </>
  );
}
