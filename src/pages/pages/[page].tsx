import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import BlogArchive from '../../components/BlogArchive';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { Post } from '../../types/types';
import fetchAPI from '../api/fetchAPI';
import { GET_POSTS_BY_CURSOR_QUERY } from '../../graphql/GraphQLQueries'; // 新しいimport

const PAGE_SIZE = 10;

function Page({ currentPage, totalPages, pageInfo, posts, endCursor }) {
  const [loadedPosts, setLoadedPosts] = useState(posts);
  const [loadedPageInfo, setLoadedPageInfo] = useState(pageInfo);
  const router = useRouter();

  console.log("pageInfopageInfopageInfopageInfopageInfo",pageInfo);
  

  const handlePageChange = async (newPage) => {
    console.log("handlePageChange 関数が呼び出されました");
    console.log("newPage:", newPage);
    
    try {
      const cursor = (newPage - 1) * PAGE_SIZE;

      const variables = {
        first: PAGE_SIZE,
        cursor: pageInfo.endCursor,
      };

      const response = await fetchAPI(GET_POSTS_BY_CURSOR_QUERY, variables);
      
      if (response.errors) {
        console.error("GraphQLエラー:", response.errors);
        return;
      }


      const newPostsData = response.data.posts.edges;
      const newPageInfo = response.data.posts.pageInfo;

     

      console.log("新しい記事データ:", newPostsData);


      // 新しいデータを既存のデータに追加
      setLoadedPosts(newPostsData);
      setLoadedPageInfo(newPageInfo)

      // ページネーションのクリック時にURLを更新
      router.push(`/pages/${newPage}`);
    } catch (err) {
      console.error("エラーが発生しました:", err);
    }
  };

  return (
    <Layout>
      <BlogArchive posts={loadedPosts} />
      <Pagination
        currentPage={currentPage}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}

export default Page;

export async function getServerSideProps(context) {

  try {
    const { params, query } = context;
    console.log("contextcontextcontextcontext", context);
    
    const pageNumber = parseInt(query.pageNumber, 10) || 1;
    const first = PAGE_SIZE;
    const cursor = query.endCursor;

    const variables = {
      first: first,
      cursor: null,
    };

    const response = await fetchAPI(GET_POSTS_BY_CURSOR_QUERY, variables);

    console.log("responseresponseresponseresponse",response);
    

    if (response.errors) {
      console.error("GraphQLエラー:", response.errors);
    }

    const postsData = response.data.posts.edges;
    const pageInfo = response.data.posts.pageInfo;

    return {
      props: {
        posts: postsData,
        currentPage: pageNumber,
        totalPages: Math.ceil(pageInfo.endCursor / PAGE_SIZE),
        pageInfo,
        cursor: cursor,
      },
    };
  } catch (err) {
    console.error("エラーが発生しました:", err);

    return {
      props: {
        posts: [],
        currentPage: 1,
        totalPages: 0,
        pageInfo: null,
        cursor: null,
      },
    };
  }
}
