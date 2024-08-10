import '../src/App.scss';
import React, { useContext, useEffect } from 'react';
import { Outlet, useLoaderData, useSearchParams } from '@remix-run/react';
import { BASE_URL, PER_PAGE } from '../src/consts';
import { LoaderFunctionArgs } from '@remix-run/node';
import { ApiResponse } from '../src/interfaces';
import { useLocalStorage } from '../src/hooks/useLocalStorage';
import { PageContext } from '../src/providers/page.provider';
import ResultsList from '../src/components/results-list/results-list';

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const q = params.get('q');
  const page = params.get('page') || '1';
  if (!q) {
    return { total_count: 0, items: [] };
  }
  const res = await fetch(
    `${BASE_URL}?q=${q}&page=${page}&per_page=${PER_PAGE}`,
  );
  const data: ApiResponse = await res.json();
  return data;
}

export default function SearchIndex(): React.ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ls] = useLocalStorage('search-term');
  const { setPage } = useContext(PageContext);
  const res = useLoaderData<typeof loader>();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('q', getSearchTerm() || '');
    params.set('page', getPageFromURL());
    setSearchParams(params);
    setPage(parseInt(getPageFromURL()));
  }, []);

  function getSearchTerm() {
    let searchQuery = '';
    if (searchParams.get('q')) {
      searchQuery = searchParams.get('q') || '';
    } else if (typeof window !== 'undefined') {
      searchQuery = ls ? ls : '';
    }
    return searchQuery;
  }

  function getPageFromURL() {
    return searchParams.get('page') || '1';
  }

  return (
    <>
      <ResultsList response={res} />
      <Outlet />
    </>
  );
}
