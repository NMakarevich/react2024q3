import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './pagination.tsx';

describe('Pagination', () => {
  it('Click on next page changes page to next', () => {
    const { pathname } = window.location;
    const url = `${pathname}?page=1`;
    window.history.pushState({}, '', url);
    render(
      <BrowserRouter>
        <Pagination totalCount={40} />
      </BrowserRouter>,
    );
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    expect(window.location.search).toBe('?page=2');
  });
  it('Click on prev page changes page to prev', () => {
    const { pathname } = window.location;
    const url = `${pathname}?page=2`;
    window.history.pushState({}, '', url);
    render(
      <BrowserRouter>
        <Pagination totalCount={60} />
      </BrowserRouter>,
    );
    const prevButton = screen.getByText('Prev page');
    fireEvent.click(prevButton);
    expect(window.location.search).toBe('?page=1');
  });
});
