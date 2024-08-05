import React, { useContext } from 'react';
import { ResultsItem } from '../results-item/results-item.tsx';
import Pagination from '../pagination/pagination.tsx';
import Loader from '../loader/loader.tsx';
import { useSelector } from 'react-redux';
import {
  selectLoading,
  selectResponse,
} from '../../redux/slices/cards.slice.ts';
import { selectItemsAmount } from '../../redux/slices/selected-items.slice.ts';
import { ThemeContext } from '../../providers/theme-provider.tsx';

export default function ResultsList(): React.ReactNode {
  const { theme } = useContext(ThemeContext);
  const loading = useSelector(selectLoading);
  const itemsAmount = useSelector(selectItemsAmount);
  const response = useSelector(selectResponse);

  return (
    <>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <div className={`container theme-${theme}`}>
          {response?.items?.length ? <Pagination /> : ''}
          <div
            className={`results-container ${itemsAmount ? 'with-flyout' : ''}`}
          >
            {response.total_count !== 0 ? (
              response.items.map((item) => (
                <ResultsItem result={item} key={item.id}></ResultsItem>
              ))
            ) : (
              <span className="not-found">No results found.</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
