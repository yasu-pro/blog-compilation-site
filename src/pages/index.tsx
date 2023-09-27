import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import BlogArchive from '../components/BlogArchive';
import { Post } from '../types/types';
import fetchAPI from './api/fetchAPI';
import Pagination from '../components/Pagination';
import { GET_POSTS_BY_CURSOR_QUERY } from '../graphql/GraphQLQueries';

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
    setEndCursor(null);
  };

  return (
    <Layout>
      <BlogArchive posts={posts} />
      <Pagination
        currentPage={currentPage}
        hasNextPage={pageInfo.hasNextPage}
        hasPreviousPage={pageInfo.hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}

export default Home;
