import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BlogArchive from '../components/BlogArchive';
import PageTitle from '../components/PageTitle';
import { Post } from '../types/types';
import fetchAPI from './api/wp';
import Pagination from '../components/Pagination';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [endCursor, setEndCursor] = useState<string | null>(null); // 最後の記事のカーソル値を保持する state
  const first = 10;
  const [pageInfo, setPageInfo] = useState({}); // 空のオブジェクトに初期化

  useEffect(() => {
    fetchData();
  }, [currentPage, endCursor]);

  const fetchData = useCallback(async () => {
    if (currentPage > 0 && endCursor === null) {
      const query = `
        query GetAllPosts($first: Int, $after: String) {
          posts(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            nodes {
              id
              postId
              date
              content
              title
              slug
              uri
              featuredImage {
                node {
                  sourceUrl
                  altText
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              categories {
                nodes {
                  name
                  link
                }
              }
            }
          }
        }
      `;

      const variables = {
        first: first,
        after: endCursor,
      };

      try {
        const response = await fetchAPI(query, variables);
        console.log(response);

        const postsNodesData = response.data.posts.nodes;

        if (currentPage === 1) {
          setPosts(postsNodesData);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...postsNodesData]);
        }
        setPageInfo(response.data.posts.pageInfo);
        setEndCursor(response.data.posts.pageInfo.endCursor);
      } catch (err) {
        setError('データの取得に失敗しました');
        console.log('~~ getAllPosts ~~');
        console.error(err);
      }
    }
  }, [currentPage, endCursor]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setEndCursor(null); // ページ切り替え時にendCursorをリセット
  };

  const shouldRenderPagination = (pageInfo.hasNextPage || pageInfo.hasPreviousPage) && Object.keys(pageInfo).length > 0;

  return (
    <main>
      <Header />
      <PageTitle title='Blog Compilation Site' />
      <BlogArchive posts={posts} />
      {shouldRenderPagination && (
        <Pagination
          currentPage={currentPage}
          hasNextPage={pageInfo.hasNextPage}
          hasPreviousPage={pageInfo.hasPreviousPage}
          onPageChange={handlePageChange}
        />
      )}
      <Footer />
    </main>
  );
};

export default Home;
