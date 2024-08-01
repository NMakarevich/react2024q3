import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store.ts';
import DetailedCard from '../../../components/detailed-card/detailed-card.tsx';
import SearchPage from '../index.tsx';

export default function DetailsPage(): React.ReactNode {
  return (
    <Provider store={store}>
      <SearchPage>
        <DetailedCard></DetailedCard>
      </SearchPage>
    </Provider>
  );
}
