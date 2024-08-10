import './results-item.scss';
import { useNavigate, useSearchParams } from '@remix-run/react';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { transformStars } from '../../utils';
import { ThemeContext } from '../../providers/theme.provider';
import { SelectedItemsContext } from '../../providers/selected-items.provider';
import { Result } from '../../interfaces';

interface Props {
  result: Result;
}

export function ResultsItem(props: Props): React.ReactNode {
  const { result } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme } = useContext(ThemeContext);
  const { itemsIds, addItem, deleteItem } = useContext(SelectedItemsContext);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(itemsIds().includes(result.id));
  }, [itemsIds()]);

  function navigateTo(event: React.MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLDivElement) {
      const params = new URLSearchParams(searchParams);
      params.set('name', result.name);
      params.set('owner', result.owner.login);
      navigate({ pathname: '/search/details', search: params.toString() });
    }
  }

  function toggleSelect(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    event.target.checked ? addItem(result) : deleteItem(result.id);
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
