import { response } from '../../mock/mock.ts';
import { render, screen } from '@testing-library/react';
import ResultsList from './results-list.tsx';
import { expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Response } from '../../App.tsx';

describe('ResultsList Component', () => {
  it('Must render specified number of results', () => {
    const mock = response;
    const itemsNumber = mock.items.length;
    render(
      <BrowserRouter>
        <ResultsList response={mock} loading={false} />
      </BrowserRouter>,
    );
    const results = screen.getAllByLabelText('result-item');
    expect(results.length).toBe(itemsNumber);
  });
  it('Must show message if no results found', () => {
    const mock: Response = { total_count: 0, items: [] };
    render(
      <BrowserRouter>
        <ResultsList response={mock} loading={false} />
      </BrowserRouter>,
    );
    const message = screen.getByText('No results found.');
    expect(message.textContent).toMatch(/No results found./);
  });
});
