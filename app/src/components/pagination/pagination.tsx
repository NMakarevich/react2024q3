import React, { useContext, useEffect } from 'react';
import './pagination.scss';
import { useSearchParams, useNavigate } from '@remix-run/react';
import { ThemeContext } from '../../providers/theme.provider';
import { PageContext } from '../../providers/page.provider';
import { PER_PAGE } from '../../consts';

interface Props {
  totalCount: number;
}

export default function Pagination(props: Props): React.ReactNode {
  const { page, setPage } = useContext(PageContext);
  const { totalCount } = props;
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    updateRouter(params);
  }, [page]);

  function updateRouter(params: URLSearchParams) {
    params.delete('owner');
    params.delete('name');
    navigate({ pathname: '/search', search: params.toString() });
  }

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
