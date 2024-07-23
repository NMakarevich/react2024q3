import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search.tsx';

describe('Search', () => {
  it('Save search term to localStorage by clicking on button', () => {
    const getSearchTermMock = vi.fn();
    render(<Search getSearchTerm={getSearchTermMock} />);
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
    const getSearchTermMock = vi.fn();
    render(<Search getSearchTerm={getSearchTermMock} />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    expect(input.value).toMatch(testValue);
  });
});
