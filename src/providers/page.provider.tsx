'use client';

import { createContext, ReactNode, useState } from 'react';

interface IPageContext {
  page: number;
  setPage: (page: number) => void;
}

export const PageContext = createContext<IPageContext>({
  page: 1,
  setPage: (page: number) => page,
});

export default function PageProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(1);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}
