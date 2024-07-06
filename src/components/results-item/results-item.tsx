import { Results } from '../../App.tsx';
import './results-item.scss';

interface Props {
  result: Results;
}

export function ResultsItem(props: Props) {
  const { result } = props;

  return (
    <>
      <div className={'card'}>
        <div className={'card-header'}>
          <div className={'card-header_left'}>
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
          <div className={'card-header_right'}>
            <span className={'card-stars'}>
              Stars: {transformStars(result.stargazers_count)}
            </span>
          </div>
        </div>
        <div className={'card-body'}>
          <p className={'card-description'}>{result.description}</p>
        </div>
      </div>
    </>
  );
}

function transformStars(stars: number): string {
  return stars >= 1000 ? `${Math.round(stars / 1000)}k` : `${stars}`;
}
