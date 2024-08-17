import React, { useContext, useEffect, useState } from 'react';
import { transformStars } from '../../utils.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store.ts';
import {
  deleteDetailedCard,
  selectDetailedCard,
} from '../../redux/slices/cards.slice.ts';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../providers/theme.provider.tsx';

export default function DetailedCard(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setOwner] = useState(searchParams.get('owner') || '');
  const [, setName] = useState(searchParams.get('name') || '');
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const item = useSelector(selectDetailedCard);

  useEffect(() => {
    setName(searchParams.get('name') || '');
    setOwner(searchParams.get('owner') || '');
  }, [searchParams]);

  function closeCard() {
    const params = new URLSearchParams(searchParams);
    params.delete('owner');
    params.delete('name');
    router.push(`/search?${params.toString()}`);
    dispatch(deleteDetailedCard());
  }

  return (
    <>
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
            {item?.topics.map((topic: string) => (
              <div className="card-topic" key={topic}>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
