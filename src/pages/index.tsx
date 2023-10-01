import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import BlogArchive from '../components/BlogArchive';
import { Post } from '../types/types';
import fetchAPI from './api/fetchAPI';
import Pagination from '../components/Pagination';
import SortComponent from '../components/SortComponent';
import { GET_POSTS_BY_CURSOR_QUERY } from '../graphql/GraphQLQueries'
import Styles from "../styles/scss/pages/top.module.scss"


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [changePosts, setChangePosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInfo, setPageInfo] = useState(null);

  const first = 100;
  const PAGE_SIZE = 5;

  const fetchData = async () => {
    const query = GET_POSTS_BY_CURSOR_QUERY;

    const variables = {
      first: first,
      after: null,
    };

    try {
      const response = await fetchAPI(query, variables);
      const postsNodesData = response.data.posts.edges;
      console.log(response);

      setPosts(postsNodesData);
      setPageInfo(response.data.posts.pageInfo);
    } catch (err) {
      setError('データの取得に失敗しました');
      console.log('データの取得エラー:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [posts,currentPage,pageInfo]);

  useEffect(()=>{
    changePostsData(currentPage)
  },[currentPage, posts])

  const totalPage: number = posts.length

  const changePostsData = (page) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const newPosts = posts.slice(start, end);
    setChangePosts(newPosts);
  }

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      {pageInfo ? (
        <>
          <div className={Styles.mainContens}>
            <BlogArchive posts={changePosts} />
            <SortComponent />
          </div>
            <Pagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPage={totalPage}
              pageSize={PAGE_SIZE}
            />
        </>
      ):(
        <p className={Styles.loading}>
          <img src="/images/loading-circle.gif" alt="loading..." />
        </p>
      )}
    </Layout>
  );
};

export default Home;
