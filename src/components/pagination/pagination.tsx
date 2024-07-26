import React, { useContext, useState } from 'react';
import './pagination.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageContext, ThemeContext } from '../../App.tsx';
import { PER_PAGE } from '../../consts.tsx';

interface Props {
  totalCount: number;
}

export default function Pagination(props: Props): React.ReactNode {
  const { page, setPage } = useContext(PageContext);
  const [currentPage, setCurrentPage] = useState(page);
  const { totalCount } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  function prevPage() {
    setPage(page - 1);
    setCurrentPage(currentPage - 1);
    if (location.pathname.includes('details')) navigate('/search');
  }

  function nextPage() {
    setPage(page + 1);
    setCurrentPage(currentPage + 1);
    if (location.pathname.includes('details')) navigate('/search');
  }

  function isLastPage() {
    return totalCount <= currentPage * PER_PAGE;
  }

  return (
    <div className={`pagination theme-${theme}`}>
      <button
        className="pagination-prev pagination-btn"
        disabled={currentPage === 1}
        onClick={prevPage}
      >
        Prev page
      </button>
      <span className="pagination-page">{`${currentPage} of ${Math.ceil(totalCount / PER_PAGE)}`}</span>
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
