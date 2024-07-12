import { PageContext, Result } from '../../App.tsx';
import './results-item.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { transformStars } from '../../utils.ts';

interface Props {
  result: Result;
}

export function ResultsItem(props: Props) {
  const { result } = props;
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);

  function navigateTo() {
    navigate(
      `/search/details?owner=${result.owner.login}&name=${result.name}&page=${pageContext}`,
    );
  }

  return (
    <>
      <div className={'result'} onClick={navigateTo}>
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
              <a className={'result-author_link link'} href={result.owner.url}>
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
