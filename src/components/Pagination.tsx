import React from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, hasNextPage, hasPreviousPage }) => {
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = hasNextPage ? currentPage + 1 : null;

  return (
    <div className="flex items-center space-x-1 mt-8">
      {hasPreviousPage && (
        <Link
          className="px-4 py-2 border hover:bg-black hover:text-white"
          href={previousPage ? `/pages/${previousPage}` : ''}
        >
          前へ
        </Link>
      )}

      <Link
        className={`px-4 py-2 border hover:bg-black hover:text-white ${
          currentPage === 1 ? 'bg-black text-white' : ''
        }`}
        href={currentPage === 1 ? '/' : `/pages/${currentPage}`}
      >
        1
      </Link>

      {currentPage > 5 && <span className="px-4 py-2">...</span>}

      {Array.from({ length: hasNextPage ? currentPage + 5 : currentPage + 4 }, (_, i) => i + 2).map(
        (page) => (
          <Link
            className={`px-4 py-2 border hover:bg-black hover:text-white ${
              currentPage === page ? 'bg-black text-white' : ''
            }`}
            href={page === 1 ? '/' : `/pages/${page}`}
            key={page}
          >
            {page}
          </Link>
        )
      )}

      {currentPage + 5 < hasNextPage && <span className="px-4 py-2">...</span>}

      <Link
        className={`px-4 py-2 border hover:bg-black hover:text-white ${
          currentPage === hasNextPage ? 'bg-black text-white' : ''
        }`}
        href={nextPage ? `/pages/${nextPage}` : ''}
      >
        {hasNextPage ? '次へ' : currentPage}
      </Link>
    </div>
  );
};

export default Pagination;
