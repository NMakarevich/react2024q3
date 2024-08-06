import { response } from '../../mock/mock.ts';
import { render, screen } from '@testing-library/react';
import ResultsList from './results-list.tsx';
import { expect } from 'vitest';
import { Provider } from 'react-redux';
import { setupStore, store } from '../../redux/store.ts';
import { renderWithProviders } from '../../redux/test-utils.tsx';
import { addCards } from '../../redux/slices/cards.slice.ts';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('ResultsList Component', () => {
  it('Must render specified number of results', () => {
    const store = setupStore();
    store.dispatch(addCards(response));
    const itemsAmount = response.items.length;
    renderWithProviders(<ResultsList />, { store });
    const results = screen.getAllByLabelText('result-item');
    expect(results.length).toBe(itemsAmount);
  });
  it('Must show message if no results found', () => {
    render(
      <Provider store={store}>
        <ResultsList />
      </Provider>,
    );
    const message = screen.getByText('No results found.');
    expect(message.textContent).toMatch(/No results found./);
  });
});
