'use client';

import React, { useContext, useEffect } from 'react';
import { PER_PAGE } from '../../consts.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../providers/theme.provider.tsx';
import { PageContext } from '../../providers/page.provider.tsx';

export default function Pagination({
  totalCount,
}: {
  totalCount: number;
}): React.ReactNode {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, setPage } = useContext(PageContext);

  function updateRouter(params: URLSearchParams) {
    params.delete('owner');
    params.delete('name');
    router.push(`/search?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    updateRouter(params);
  }, [page]);

  function prevPage() {
    setPage(page - 1);
  }

  function nextPage() {
    setPage(page + 1);
  }

  function isLastPage() {
    return totalCount <= page * PER_PAGE;
  }

  return (
    <div className={`pagination theme-${theme}`}>
      <button
        className="pagination-prev pagination-btn"
        disabled={page === 1}
        onClick={prevPage}
      >
        Prev page
      </button>
      <span className="pagination-page">{`${page} of ${Math.ceil(totalCount / PER_PAGE)}`}</span>
      <button
        className="pagination-next pagination-btn"
        disabled={isLastPage()}
        onClick={nextPage}
      >
        Next page
      </button>
    </div>
  );
}
