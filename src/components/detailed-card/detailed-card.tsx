import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../../App.tsx';
import React, { useContext, useEffect, useState } from 'react';
import './detailed-card.scss';
import { transformStars } from '../../utils.ts';
import Loader from '../loader/loader.tsx';
import { useGetCardQuery } from '../../redux/slices/api.slice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import {
  addDetailedCard,
  deleteDetailedCard,
} from '../../redux/slices/cards.slice.ts';

export default function DetailedCard(): React.ReactNode {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [owner, setOwner] = useState(searchParams.get('owner') || '');
  const [name, setName] = useState(searchParams.get('name') || '');
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { data: item, isFetching } = useGetCardQuery({ owner, name });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setName(searchParams.get('name') || '');
    setOwner(searchParams.get('owner') || '');
  }, [location]);

  useEffect(() => {
    if (!isFetching && item) dispatch(addDetailedCard(item));
  }, [isFetching]);

  function closeCard() {
    const page = searchParams.get('page');
    navigate('..');
    if (page) setSearchParams({ page });
    dispatch(deleteDetailedCard());
  }

  return (
    <>
      {isFetching ? (
        <Loader isLoading={isFetching} />
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
