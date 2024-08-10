import React, { useContext, useEffect, useState } from 'react';
import { ResultsItem } from '../results-item/results-item';
import './results-list.scss';
import Pagination from '../pagination/pagination';
import { ThemeContext } from '../../providers/theme.provider';
import { SelectedItemsContext } from '../../providers/selected-items.provider';
import { Flyout } from '../flyout/flyout';
import { ApiResponse } from '../../interfaces';
import { useNavigation } from '@remix-run/react';
import Loader from '../loader/loader';

interface Props {
  response: ApiResponse;
}

export default function ResultsList(props: Props): React.ReactNode {
  const { response } = props;
  const { theme } = useContext(ThemeContext);
  const { items } = useContext(SelectedItemsContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.state === 'loading' ? setIsLoading(true) : setIsLoading(false);
  }, [navigation.state]);

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
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : response.items.length ? (
            response.items.map((item) => (
              <ResultsItem result={item} key={item.id}></ResultsItem>
            ))
          ) : (
            'No results found.'
          )}
        </div>
        <Flyout />
      </div>
    </>
  );
}
