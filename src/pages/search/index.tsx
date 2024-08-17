import { AppDispatch } from '../../redux/store.ts';
import { useDispatch } from 'react-redux';
import React, { useContext, useEffect } from 'react';
import { BASE_URL, PER_PAGE } from '../../consts.tsx';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ResultsList from '../../components/results-list/results-list.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { addCards } from '../../redux/slices/cards.slice.ts';
import { Response } from '../../interfaces.ts';
import { useLocalStorage } from '../../hooks/useLocalStorage.tsx';
import { PageContext } from '../../providers/page.provider.tsx';

export const getServerSideProps = (async (context) => {
  const { page, q } = context.query;
  if (!q) {
    const res: Response = { total_count: 0, items: [] };
    return { props: { res } };
  }
  const response = await fetch(
    `${BASE_URL}?q=${q}&page=${page}&per_page=${PER_PAGE}`,
  );
  const res: Response = await response.json();
  return { props: { res } };
}) satisfies GetServerSideProps<{ res: Response }>;

export default function SearchPage({
  res,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ls] = useLocalStorage('search-term');
  const dispatch = useDispatch<AppDispatch>();
  const { setPage } = useContext(PageContext);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('q', getSearchTerm() || '');
    params.set('page', getPageFromURL());
    router.push(`${pathname}?${params.toString()}`);
    setPage(parseInt(getPageFromURL()));
  }, []);

  useEffect(() => {
    if (res && res.items.length) dispatch(addCards(res));
  }, [res]);

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

  return <ResultsList></ResultsList>;
}
