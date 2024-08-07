'use client';

import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { transformStars } from '../../utils.ts';
import { useRouter, useSearchParams } from 'next/navigation';
import { Result } from '../../interfaces.ts';
import { ThemeContext } from '../../providers/theme.provider.tsx';
import { SelectedItemsContext } from '../../providers/selected-items.provider.tsx';

interface Props {
  result: Result;
}

export function ResultsItem(props: Props): React.ReactNode {
  const { result } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useContext(ThemeContext);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { itemsIds, addItem, removeItem } = useContext(SelectedItemsContext);

  useEffect(() => {
    setIsSelected(itemsIds().includes(result.id));
  }, [itemsIds()]);

  function navigateTo(event: React.MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLDivElement) {
      const params = new URLSearchParams(searchParams);
      params.set('owner', result.owner.login);
      params.set('name', result.name);
      router.push(`/search/details?${params.toString()}`);
    }
  }

  function toggleSelect(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    event.target.checked ? addItem(result) : removeItem(result.id);
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
