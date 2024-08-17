import React, { useContext } from 'react';
import { PER_PAGE } from '../../consts.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../providers/theme.provider.tsx';
import { useSelector } from 'react-redux';
import { selectTotalCount } from '../../redux/slices/cards.slice.ts';
import { PageContext } from '../../providers/page.provider.tsx';

export default function Pagination(): React.ReactNode {
  const totalCount = useSelector(selectTotalCount);
  const { theme } = useContext(ThemeContext);
  const { page, setPage } = useContext(PageContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateRouter(targetPage: number) {
    const params = new URLSearchParams(searchParams);
    if (targetPage !== page) {
      params.delete('owner');
      params.delete('name');
      params.set('page', targetPage.toString());
      setPage(targetPage);
      router.push(`/search?${params.toString()}`);
    }
  }

  function prevPage() {
    updateRouter(page - 1);
  }

  function nextPage() {
    updateRouter(page + 1);
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
