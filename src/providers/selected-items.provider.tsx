'use client';

import { createContext, ReactNode, useState } from 'react';
import { ISelectedItemsContext, Result } from '../interfaces.ts';

export const SelectedItemsContext = createContext<ISelectedItemsContext>({
  items: [],
  itemsIds: () => [],
  addItem: (item) => item,
  removeItem: (id) => id,
  unselectAll: () => {},
});

export default function SelectedItemsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<Result[]>([]);

  function itemsIds() {
    return items.map((item) => item.id);
  }

  function addItem(item: Result) {
    setItems([...items, item]);
  }

  function removeItem(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  function unselectAll() {
    setItems([]);
  }

  return (
    <SelectedItemsContext.Provider
      value={{
        items,
        itemsIds,
        addItem,
        removeItem,
        unselectAll,
      }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
}
