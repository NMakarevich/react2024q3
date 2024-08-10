import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './pagination';
import PageProvider from '../../providers/page.provider';

describe('Pagination', () => {
  it('Click on next page changes page to next', () => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <PageProvider>
          <Pagination totalCount={40} />
        </PageProvider>
      </MemoryRouter>,
    );
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    const paginationText = nextButton.previousElementSibling;
    expect(paginationText?.textContent).toBe('2 of 2');
  });
  it('Click on prev page changes page to prev', () => {
    render(
      <MemoryRouter initialEntries={['?page=2']}>
        <PageProvider>
          <Pagination totalCount={40} />
        </PageProvider>
      </MemoryRouter>,
    );
    const prevButton = screen.getByRole('button', { name: /Prev/i });
    fireEvent.click(prevButton);
    const paginationText = prevButton.nextElementSibling;
    expect(paginationText?.textContent).toBe('1 of 2');
  });
});
