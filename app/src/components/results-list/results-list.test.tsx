import { response } from '../../mock/mock';
import { render, screen } from '@testing-library/react';
import ResultsList from './results-list';
import { expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { ApiResponse } from '../../interfaces';

describe('ResultsList Component', () => {
  it('Must render specified number of results', () => {
    const itemsNumber = response.items.length;
    const router = createMemoryRouter([
      { path: '*', element: <ResultsList response={response} /> },
    ]);
    render(<RouterProvider router={router} />);
    const results = screen.getAllByLabelText('result-item');
    expect(results.length).toBe(itemsNumber);
  });
  it('Must show message if no results found', () => {
    const mock: ApiResponse = { total_count: 0, items: [] };
    const router = createMemoryRouter([
      { path: '*', element: <ResultsList response={mock} /> },
    ]);
    render(<RouterProvider router={router} />);
    const message = screen.getByText('No results found.');
    expect(message.textContent).toMatch(/No results found./);
  });
});
