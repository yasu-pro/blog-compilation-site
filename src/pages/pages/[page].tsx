// [page].tsx

import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import BlogArchive from '../../components/BlogArchive';
import Pagination from '../../components/Pagination';
import { Post } from '../../types/types';
import fetchAPI from '../api/wp';

console.log("hoge");


const PAGE_SIZE = 10; // 1ページあたりの表示件数

import { useEffect, useState } from 'react';

function Page({ posts, currentPage, totalPages, pageInfo }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const handlePageChange = (newPage) => {
    router.push(`/pages/${newPage}`);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main>
      <Header />
      <BlogArchive posts={isMounted ? posts : []} />
      {totalPages > 1 && pageInfo && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}


Page.defaultProps = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
  pageInfo: null,
};

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const pageNumber = parseInt(params.pageNumber, 10);
    const first = PAGE_SIZE;
    const after = (pageNumber - 1) * PAGE_SIZE;

    const query = `
      // クエリの定義
    `;

    const variables = {
      first: first,
      after: after,
    };

    const response = await fetchAPI(query, variables);
    const postsData = response.data.posts.nodes;
    const pageInfo = response.data.posts.pageInfo;

    return {
      props: {
        posts: postsData,
        currentPage: pageNumber,
        totalPages: Math.ceil(postsData.length / PAGE_SIZE),
        pageInfo,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        posts: [],
        currentPage: 1, // デフォルト値を設定
        totalPages: 0,
        pageInfo: null,
      },
    };
  }
}



export default Page;
