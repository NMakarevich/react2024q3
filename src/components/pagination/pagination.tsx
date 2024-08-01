import React, { useContext } from 'react';
import { PageContext, ThemeContext } from '../../App.tsx';
import { PER_PAGE } from '../../consts.tsx';
import { useRouter } from 'next/navigation';

interface Props {
  totalCount: number;
}

export default function Pagination(props: Props): React.ReactNode {
  const { page, setPage } = useContext(PageContext);
  const { totalCount } = props;
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  function prevPage() {
    setPage(page - 1);
    router.push(`/search?page=${page - 1}`);
  }

  function nextPage() {
    setPage(page + 1);
    router.push(`/search?page=${page + 1}`);
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
