import { response } from '../../mock/mock.ts';
import { render, screen } from '@testing-library/react';
import ResultsList from './results-list.tsx';
import { expect } from 'vitest';
import GlobalProvider from '../../providers/global.provider.tsx';

vi.mock('next/navigation', async () => ({
  useSearchParams: () => ({
    get: vi.fn(),
    set: vi.fn(),
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('ResultsList Component', () => {
  it('Must render specified number of results', () => {
    const itemsAmount = response.items.length;
    render(
      <GlobalProvider>
        <ResultsList response={response} />
      </GlobalProvider>,
    );
    const results = screen.getAllByLabelText('result-item');
    expect(results.length).toBe(itemsAmount);
  });
  it('Must show message if no results found', () => {
    render(
      <GlobalProvider>
        <ResultsList response={{ total_count: 0, items: [] }} />
      </GlobalProvider>,
    );
    const message = screen.getByText('No results found.');
    expect(message.textContent).toMatch(/No results found./);
  });
});
