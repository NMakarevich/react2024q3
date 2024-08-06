import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search.tsx';
import { Provider } from 'react-redux';
import { store } from '../../redux/store.ts';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Search', () => {
  it('Save search term to localStorage by clicking on button', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
    const input = screen.getByLabelText('search-input');
    const button = screen.getByRole('button');
    const testValue = 'ls test for setting term';
    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.click(button);
    const localStorageValue = localStorage.getItem('search-term');
    expect(localStorageValue).toMatch(testValue);
  });
  it('Component gets correct value from localStorage', () => {
    const testValue = 'ls test for getting term';
    localStorage.setItem('search-term', testValue);
    render(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    expect(input.value).toMatch(testValue);
  });
});
