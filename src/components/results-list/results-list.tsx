'use client';

import React, { useContext } from 'react';
import { ResultsItem } from '../results-item/results-item.tsx';
import Pagination from '../pagination/pagination.tsx';
import { ThemeContext } from '../../providers/theme.provider.tsx';
import { ApiResponse } from '../../interfaces.ts';
import { Flyout } from '../flyout/flyout.tsx';
import { SelectedItemsContext } from '../../providers/selected-items.provider.tsx';

export default function ResultsList({
  response,
}: {
  response: ApiResponse;
}): React.ReactNode {
  const { theme } = useContext(ThemeContext);
  const { items } = useContext(SelectedItemsContext);

  return (
    <div className={`container theme-${theme}`}>
      {response?.items?.length ? (
        <Pagination totalCount={response.total_count} />
      ) : (
        ''
      )}
      <div className={`results-container ${items.length ? 'with-flyout' : ''}`}>
        {response.total_count !== 0 ? (
          response.items.map((item) => (
            <ResultsItem result={item} key={item.id} />
          ))
        ) : (
          <span className="not-found">No results found.</span>
        )}
      </div>
      <Flyout />
    </div>
  );
}
