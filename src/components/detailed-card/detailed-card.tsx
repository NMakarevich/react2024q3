import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeContext, Result } from '../../App.tsx';
import React, { useContext, useEffect, useState } from 'react';
import './detailed-card.scss';
import { transformStars } from '../../utils.ts';
import Loader from '../loader/loader.tsx';
import { getDetailedCard } from '../../api.ts';

export default function DetailedCard(): React.ReactNode {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [item, setItem] = useState<Result>();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    loadData().then(() => setLoading(false));
  }, [location]);

  async function loadData() {
    const owner = searchParams.get('owner');
    const name = searchParams.get('name');
    if (owner && name) {
      setLoading(true);
      const detailed = await getDetailedCard(owner, name);
      setItem(detailed);
    }
  }

  function closeCard() {
    const page = searchParams.get('page');
    navigate('..');
    if (page) setSearchParams({ page });
  }

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className={`card theme-${theme}`}>
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
