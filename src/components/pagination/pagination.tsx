import React, { useContext, useEffect } from 'react';
import { PER_PAGE } from '../../consts.tsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeContext } from '../../providers/theme-provider.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPage,
  selectTotalCount,
  updatePage,
} from '../../redux/slices/cards.slice.ts';
import { AppDispatch } from '../../redux/store.ts';

export default function Pagination(): React.ReactNode {
  const totalCount = useSelector(selectTotalCount);
  const page = useSelector(selectPage);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(updatePage(page - 1));
  }

  function nextPage() {
    dispatch(updatePage(page + 1));
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
