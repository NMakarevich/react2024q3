import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './pagination.tsx';
import PageProvider from '../../providers/page.provider.tsx';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Pagination', () => {
  it('Click on next page changes page to next', async () => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <PageProvider>
          <Pagination totalCount={30} />
        </PageProvider>
      </MemoryRouter>,
    );
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
    await waitFor(() => {
      const paginationText = nextButton.previousElementSibling;
      expect(paginationText?.textContent).toBe('2 of 2');
    });
  });
  it('Click on prev page changes page to prev', async () => {
    render(
      <MemoryRouter initialEntries={['?page=2']}>
        <PageProvider>
          <Pagination totalCount={30} />
        </PageProvider>
      </MemoryRouter>,
    );
    const prevButton = screen.getByRole('button', { name: /Prev/i });
    const paginationText = prevButton.nextElementSibling;
    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(paginationText?.textContent).toBe('1 of 2');
    });
  });
});
