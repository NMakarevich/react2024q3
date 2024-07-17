import React, { useContext } from 'react';
import './pagination.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageContext, PageContext } from '../../App.tsx';
import { PER_PAGE } from '../../consts.tsx';

interface Props {
  totalCount: number;
}

export default function Pagination(props: Props): React.ReactNode {
  const { page, setPage } = useContext(PageContext) as pageContext;
  const { totalCount } = props;
  const navigate = useNavigate();
  const location = useLocation();

  function prevPage() {
    setPage(page - 1);
    if (location.pathname.includes('details')) navigate('/search');
  }

  function nextPage() {
    setPage(page + 1);
    if (location.pathname.includes('details')) navigate('/search');
  }

  function isLastPage() {
    return totalCount <= page * PER_PAGE;
  }

  return (
    <div className="pagination">
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
