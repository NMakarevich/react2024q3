import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { REPO_URL } from '../../consts.tsx';
import { Result } from '../../App.tsx';
import { useEffect, useState } from 'react';

import './detailed-card.scss';
import { transformStars } from '../../utils.ts';
import Loader from '../loader/loader.tsx';

export default function DetailedCard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<Result>();
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, [location]);

  function loadData() {
    setLoading(true);
    fetch(
      `${REPO_URL}/${searchParams.get('owner')}/${searchParams.get('name')}`,
    )
      .then((res) => res.json())
      .then((data: Result) => {
        setItem(data);
        setLoading(false);
      });
  }

  function closeCard() {
    navigate('..');
  }

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className="card">
          <button className="card-close" onClick={closeCard}>
            X
          </button>
          <div className="card-header">
            <img
              className="card-logo"
              src={item?.owner.avatar_url}
              alt={item?.owner.login}
            />
            <div className="card-info">
              <div className="card-info_title">
                <h2 className="card-title">{item?.name}</h2>
                <div className="card-author">
                  <span className="card-autor_text">Author: </span>
                  <h3 className="card-autor_login">{item?.owner.login}</h3>
                </div>
              </div>
              <div className="card-stars">
                Stars: {transformStars(item?.stargazers_count)}
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-description">{item?.description}</p>
            <span className={'card-language'}>Language: {item?.language}</span>
            <div className="card-topics">
              {item?.topics.map((topic) => (
                <div className="card-topic" key={topic}>
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
