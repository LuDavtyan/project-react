import './pagination.css';
import React, { useContext } from 'react';
import { Context } from '../list/list';

const Pagination = () => {
  const { handleChangePagination, page, totalPages } = useContext(Context);

  return (
    <div className="Pagination">
      <button
        className= "Pagination-button"
        disabled = {page === 1}
        onClick= {() => handleChangePagination('prev')}
      >
        &larr;
      </button>
      
      <span className="Pagination-info">
        page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        className="Pagination-button"
        disabled={page === totalPages}
        onClick={() => handleChangePagination('next')}
      >
        &rarr;
      </button>
    </div>
  );
}



export default Pagination;
