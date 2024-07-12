import { PageContext, Result } from '../../App.tsx';
import './results-item.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

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
      <div className={'card'} onClick={navigateTo}>
        <div className={'card-left'}>
          <img
            className={'card-logo'}
            src={result.owner.avatar_url}
            alt={result.owner.login}
          />
          <div className={'card-info'}>
            <a className={'card-link link'} href={result.html_url}>
              <h2 className={'card-title'}>{result.name}</h2>
            </a>
            <div className={'card-author'}>
              <h3 className={'card-author_title'}>Author:</h3>
              <a className={'card-author_link link'} href={result.owner.url}>
                {result.owner.login}
              </a>
            </div>
          </div>
        </div>
        <div className={'card-right'}>
          <span className={'card-stars'}>
            Stars: {transformStars(result.stargazers_count)}
          </span>
        </div>
      </div>
    </>
  );
}

function transformStars(stars: number): string {
  return stars >= 1000 ? `${Math.round(stars / 1000)}k` : `${stars}`;
}
