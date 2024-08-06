import { renderWithProviders } from '../../redux/test-utils.tsx';
import { response } from '../../mock/mock.ts';
import { Flyout } from './flyout.tsx';
import { fireEvent, screen } from '@testing-library/react';
import { setupStore } from '../../redux/store.ts';
import { addItem } from '../../redux/slices/selected-items.slice.ts';
import { addCards } from '../../redux/slices/cards.slice.ts';
import ResultsList from '../results-list/results-list.tsx';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: vi.fn(),
}));

describe('Flyout', () => {
  global.URL.createObjectURL = vi.fn();
  it('If check to items should display "Selected items: 2"', () => {
    const store = setupStore();
    store.dispatch(addCards(response));
    renderWithProviders(
      <>
        <ResultsList></ResultsList>
        <Flyout></Flyout>
      </>,
      { store },
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    const selectedAmount = screen.getByText('Selected items:');
    const amount = selectedAmount.nextElementSibling;
    expect(amount?.textContent).toBe('2');
  });
  it('Click on unselect all should uncheck item', () => {
    const store = setupStore();
    store.dispatch(addItem(response.items[0]));
    renderWithProviders(
      <>
        <Flyout></Flyout>
      </>,
      { store },
    );
    const unselect = screen.getByRole('button', { name: /Unselect/i });
    fireEvent.click(unselect);
    expect(unselect).toBeNull;
  });
});
