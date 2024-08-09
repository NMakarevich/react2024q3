import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { IPageContext, PageContext } from '../../App.tsx';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { response } from '../../mock/mock.ts';
import Pagination from './pagination.tsx';

const server = setupServer(
  http.get('https://api.github.com/search/repositories', () => {
    return HttpResponse.json(response);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const props: IPageContext = {
  page: 1,
  setPage: vi.fn(),
};

describe('Pagination', () => {
  it('Click on next page changes page to next', () => {
    render(
      <MemoryRouter initialEntries={['?page=1']}>
        <PageContext.Provider value={props}>
          <Pagination totalCount={40} />
        </PageContext.Provider>
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
        <PageContext.Provider value={props}>
          <Pagination totalCount={40} />
        </PageContext.Provider>
      </MemoryRouter>,
    );
    const prevButton = screen.getByRole('button', { name: /Prev/i });
    fireEvent.click(prevButton);
    const paginationText = prevButton.nextElementSibling;
    expect(paginationText?.textContent).toBe('1 of 2');
  });
});
