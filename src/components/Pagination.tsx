import React from 'react';

const Pagination = ({
  onPageChange,
  totalNumberOfArticles,
  pageSize,
  currentPage
}: {
  onPageChange: (page: number) => void;
  totalNumberOfArticles: number;
  pageSize: number;
  currentPage: number;
}) => {
  const pageButtons = [];

  // pageNation何個表示するか
  const maxPageNation = Math.ceil(totalNumberOfArticles / pageSize);

  // ページネーションの中心位置
  const centerPage = 5;

  // ページネーションの数字を表示する関数
  const renderPageButtons = (start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      const isCurrentPage = i === currentPage;
      pageButtons.push(
        <span
          key={i}
          className={`px-4 py-2 border hover:bg-black hover:text-white ${isCurrentPage ? 'bg-black text-white' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </span>
      );
    }
  };

  if (maxPageNation <= centerPage) {
    // ページネーションが中心位置より少ない場合
    renderPageButtons(1, maxPageNation);
  } else if (currentPage < centerPage) {
    // centerPageより前のページの場合
    renderPageButtons(1, centerPage);
    pageButtons.push(
      <span key="ellipsis-end" className={`px-4 py-2 border`}>
        ...
      </span>
    );
    renderPageButtons(maxPageNation, maxPageNation);
  } else if (currentPage > maxPageNation - centerPage + 1) {//13
    // centerPageより後のページの場合
    renderPageButtons(1, 1);
    pageButtons.push(
      <span key="ellipsis-start" className={`px-4 py-2 border`}>
        ...
      </span>
    );
    renderPageButtons(maxPageNation - centerPage + 1, maxPageNation);
  } else {
    // centerPageを中心としたページの場合
    renderPageButtons(1, 1);
    pageButtons.push(
      <span key="ellipsis-start" className={`px-4 py-2 border`}>
        ...
      </span>
    );
    renderPageButtons(currentPage - 2, currentPage + 2);
    pageButtons.push(
      <span key="ellipsis-end" className={`px-4 py-2 border`}>
        ...
      </span>
    );
    renderPageButtons(maxPageNation, maxPageNation);
  }

  return (
    <div className="flex items-center justify-center mt-8 space-x-1">
      {pageButtons}
    </div>
  );
};

export default Pagination;
