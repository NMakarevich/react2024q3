import { createContext, ReactNode, useState } from 'react';
import { Result } from '../App';

export interface ISelectedItems {
  items: Result[];
  itemsIds: () => number[];
  addItem: (item: Result) => void;
  deleteItem: (id: number) => void;
  unselectAll: () => void;
}

export const SelectedItemsContext = createContext<ISelectedItems>({
  items: [],
  itemsIds: () => [],
  addItem: (item: Result) => item,
  deleteItem: (id: number) => id,
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

  function deleteItem(id: number) {
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
        deleteItem,
        unselectAll,
      }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
}
