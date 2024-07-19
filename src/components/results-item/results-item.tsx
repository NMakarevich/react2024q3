import { PageContext, ThemeContext, Result } from '../../App.tsx';
import './results-item.scss';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { transformStars } from '../../utils.ts';

interface Props {
  result: Result;
}

export function ResultsItem(props: Props): React.ReactNode {
  const { result } = props;
  const navigate = useNavigate();
  const { page } = useContext(PageContext);
  const { theme } = useContext(ThemeContext);

  function navigateTo() {
    navigate(
      `/search/details?owner=${result.owner.login}&name=${result.name}&page=${page}`,
    );
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
      </div>
    </>
  );
}
