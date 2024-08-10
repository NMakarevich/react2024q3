import { Flyout } from './flyout';
import { fireEvent, render, screen } from '@testing-library/react';
import { SelectedItemsContext } from '../../providers/selected-items.provider';
import { response } from '../../mock/mock';
import { vi } from 'vitest';

describe('Flyout', () => {
  global.URL.createObjectURL = vi.fn();
  it('Should display "Selected items: 3"', async () => {
    render(
      <SelectedItemsContext.Provider
        value={{
          items: response.items.slice(0, 3),
          addItem: vi.fn(),
          itemsIds: vi.fn(),
          deleteItem: vi.fn(),
          unselectAll: vi.fn(),
        }}
      >
        <Flyout />
      </SelectedItemsContext.Provider>,
    );
    const selectedAmount = await screen.findByText('Selected items:');
    const amount = selectedAmount.nextElementSibling;
    expect(amount?.textContent).toBe('3');
  });
  it('Click on unselect all should uncheck item', () => {
    render(
      <SelectedItemsContext.Provider
        value={{
          items: response.items,
          addItem: vi.fn(),
          itemsIds: vi.fn(),
          deleteItem: vi.fn(),
          unselectAll: vi.fn(),
        }}
      >
        <Flyout />
      </SelectedItemsContext.Provider>,
    );
    const unselect = screen.getByRole('button', { name: /Unselect/i });
    fireEvent.click(unselect);
    expect(unselect).toBeNull;
  });
});
