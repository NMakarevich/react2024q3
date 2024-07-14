import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search.tsx';
import { Response } from '../../App.tsx';

describe('Search', () => {
  it('Save search term to localStorage by clicking on button', () => {
    const loading = (isLoading: boolean) => {
      console.log(isLoading);
    };
    const response = (response: Response) => {
      console.log(response);
    };
    render(<Search setLoading={loading} sendResponse={response} />);
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
    const loading = (isLoading: boolean) => {
      console.log(isLoading);
    };
    const response = (response: Response) => {
      console.log(response);
    };
    render(<Search setLoading={loading} sendResponse={response} />);
    const input = screen.getByLabelText('search-input') as HTMLInputElement;
    expect(input.value).toMatch(testValue);
  });
});
