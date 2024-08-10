import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search';
import { BrowserRouter } from 'react-router-dom';

describe('Search', () => {
  it('Save search term to localStorage by clicking on button', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );
    const input = screen.getByLabelText('search-input');
    const button = screen.getByRole('button');
    const testValue = 'ls test for setting term';
    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.click(button);
    const localStorageValue = localStorage.getItem('search-term');
    expect(localStorageValue).toMatch(testValue);
  });
});
