'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import React, { useContext, useEffect } from 'react';
import ResultsList from '../../components/results-list/results-list.tsx';
import { ApiResponse } from '../../interfaces.ts';
import { PageContext } from '../../providers/page.provider.tsx';
import SelectedItemsProvider from '../../providers/selected-items.provider.tsx';

export default function SearchPage({
  res,
  children,
}: {
  res: ApiResponse;
  children?: React.ReactNode;
}): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ls] = useLocalStorage('search-term');
  const { setPage } = useContext(PageContext);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('q', getSearchTerm() || '');
    params.set('page', getPageFromURL());
    router.push(`${pathname}?${params.toString()}`);
    setPage(parseInt(getPageFromURL()));
  }, []);

  function getPageFromURL() {
    return searchParams.get('page') || '1';
  }

  function getSearchTerm() {
    let searchQuery = '';
    if (searchParams.get('q')) {
      searchQuery = searchParams.get('q') || '';
    } else if (typeof window !== 'undefined') {
      searchQuery = ls ? ls : '';
    }
    return searchQuery;
  }

  return (
    <SelectedItemsProvider>
      <ResultsList response={res} />
      {children}
    </SelectedItemsProvider>
  );
}
