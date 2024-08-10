import { response } from '../../mock/mock';
import { render, screen } from '@testing-library/react';
import ResultsList from './results-list';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ApiResponse } from '../../interfaces';

describe('ResultsList Component', () => {
  it('Must render specified number of results', () => {
    const mock = response;
    const itemsNumber = mock.items.length;
    render(
      <BrowserRouter>
        <ResultsList response={mock} />
      </BrowserRouter>,
    );
    const results = screen.getAllByLabelText('result-item');
    expect(results.length).toBe(itemsNumber);
  });
  it('Must show message if no results found', () => {
    const mock: ApiResponse = { total_count: 0, items: [] };
    render(
      <BrowserRouter>
        <ResultsList response={mock} />
      </BrowserRouter>,
    );
    const message = screen.getByText('No results found.');
    expect(message.textContent).toMatch(/No results found./);
  });
});
