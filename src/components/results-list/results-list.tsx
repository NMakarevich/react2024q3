import React, { useContext } from 'react';
import { ThemeContext, Response } from '../../App.tsx';
import { ResultsItem } from '../results-item/results-item.tsx';
import './results-list.scss';
import Pagination from '../pagination/pagination.tsx';
import Loader from '../loader/loader.tsx';

interface Props {
  response: Response;
  loading: boolean;
}

export default function ResultsList(props: Props): React.ReactNode {
  const { response, loading } = props;
  const { theme } = useContext(ThemeContext);

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
          <div className={'results-container'}>
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
