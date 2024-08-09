import React, { useContext } from 'react';
import { ResultsItem } from '../results-item/results-item';
import './results-list.scss';
import Pagination from '../pagination/pagination';
import { ThemeContext } from '../../providers/theme.provider';
import { SelectedItemsContext } from '../../providers/selected-items.provider';
import { Flyout } from '../flyout/flyout';
import { ApiResponse } from '../../../src/interfaces';

interface Props {
  response: ApiResponse;
}

export default function ResultsList(props: Props): React.ReactNode {
  const { response } = props;
  const { theme } = useContext(ThemeContext);
  const { items } = useContext(SelectedItemsContext);

  return (
    <>
      <div className={`container theme-${theme}`}>
        {response?.items?.length ? (
          <Pagination totalCount={response.total_count} />
        ) : (
          ''
        )}
        <div
          className={`results-container ${items.length ? 'with-flyout' : ''}`}
        >
          {response.items.length
            ? response.items.map((item) => (
                <ResultsItem result={item} key={item.id}></ResultsItem>
              ))
            : 'No results found.'}
        </div>
        <Flyout />
      </div>
    </>
  );
}
