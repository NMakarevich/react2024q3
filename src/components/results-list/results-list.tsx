import React, { useContext } from 'react';
import { ThemeContext, Response } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';
import Pagination from '../pagination/pagination.tsx';
import Loader from '../loader/loader.tsx';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/slices/cards.slice.ts';
import { selectItemsAmount } from '../../redux/slices/selected-items.slice.ts';

interface Props {
  response: Response;
}

export default function ResultsList(props: Props): React.ReactNode {
  const { response } = props;
  const { theme } = useContext(ThemeContext);
  const loading = useSelector(selectLoading);
  const itemsAmount = useSelector(selectItemsAmount);

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className={`container theme-${theme}`}>
          {response?.items?.length ? (
            <Pagination totalCount={response.total_count} />
          ) : (
            ''
          )}
          <div
            className={`results-container ${itemsAmount ? 'with-flyout' : ''}`}
          >
            {response.items.length
              ? response.items.map((item) => (
                  <ResultsItem result={item} key={item.id}></ResultsItem>
                ))
              : 'No results found.'}
          </div>
        </div>
      )}
    </>
  );
}
