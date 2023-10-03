import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';
import BlogArchive from '../components/BlogArchive';
import { Post } from '../types/types';
import fetchAPI from './api/fetchAPI';
import Pagination from '../components/Pagination';
import SortComponent from '../components/SortComponent';
import { GET_POSTS_BY_CURSOR_QUERY } from '../graphql/GraphQLQueries';
import Styles from "../styles/scss/pages/top.module.scss";

const Home = () => {
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [changePosts, setChangePosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState<number>(0);
  const [sortOption, setSortOption] = useState('des');

  const first = 100;
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    renderPostsData(currentPage);
  }, [currentPage,postsData]);

  const fetchData = async () => {
    const query = GET_POSTS_BY_CURSOR_QUERY;
    const variables = {
      first: first,
      after: null,
    };

    try {
      const response = await fetchAPI(query, variables);
      setPostsData(response.data.posts.edges);

      if (response.data.posts.edges) {
        setTotalNumberOfArticles(response.data.posts.edges.length);
      }
    } catch (err) {
      setError('データの取得に失敗しました');
      console.log('データの取得エラー:', err);
    }
  };

  const renderPostsData = (page) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const newPosts = postsData.slice(start, end);
    setChangePosts(newPosts);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleSortPosts = (sortOption) => {
    let sortedPosts = [...postsData];

    if (sortOption === 'asc') {
      sortedPosts.sort((a, b) => new Date(a.node.date) - new Date(b.node.date));
      setSortOption('asc');
    } else if (sortOption === 'des') {
      sortedPosts.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));
      setSortOption('des');
    }

    setPostsData(sortedPosts);

    handlePageChange(1);

    renderPostsData(1);
  };

  return (
    <Layout>
      {postsData ? (
        <>
          <div className={Styles.mainContens}>
            <BlogArchive posts={changePosts} />
            <SortComponent
              sortOption={sortOption}
              onSortChange={handleSortPosts}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPage={totalNumberOfArticles}
            pageSize={PAGE_SIZE}
          />
        </>
      ) : (
        <p className={Styles.loading}>
          <Image
            src="/images/loading-circle.gif"
            alt="loading..."
            width={150}
            height={150}
            style={{ width: '150', height: '150' }}
          />
        </p>
      )}
    </Layout>
  );
};

export default Home;
