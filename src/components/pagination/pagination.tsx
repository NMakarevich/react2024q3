import React, { useContext, useState } from 'react';
import { PER_PAGE } from '../../consts.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../providers/theme-provider.tsx';
import { useSelector } from 'react-redux';
import { selectTotalCount } from '../../redux/slices/cards.slice.ts';

export default function Pagination(): React.ReactNode {
  const totalCount = useSelector(selectTotalCount);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  function updateRouter(params: URLSearchParams) {
    params.delete('owner');
    params.delete('name');
    router.push(`/search?${params.toString()}`);
  }

  function prevPage() {
    setPage(page - 1);
    const params = new URLSearchParams(searchParams);
    params.set('page', (page - 1).toString());
    updateRouter(params);
  }

  function nextPage() {
    setPage(page + 1);
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());
    updateRouter(params);
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
