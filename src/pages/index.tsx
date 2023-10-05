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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [hasMatchedResults, setHasMatchedResults] = useState(true);
  const [loading, setLoading] = useState(true);

  const first = 100;
  const PAGE_SIZE = 5;

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    renderPostsData(currentPage, selectedCategory);
  }, [currentPage,
      selectedCategory,
      sortOption,
      searchedKeyword,postsData
    ]);


  const fetchData = async () => {
    const query = GET_POSTS_BY_CURSOR_QUERY;
    const variables = {
      first: first,
      after: null,
    };

    try {
      const response = await fetchAPI(query, variables);
      setPostsData(response.data.posts.edges);
      setChangePosts(response.data.posts.edges);

      if (response.data.posts.edges) {
        setTotalNumberOfArticles(response.data.posts.edges.length);
      }
    } catch (err) {
      setError('データの取得に失敗しました');
      console.log('データの取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderPostsData = (page, category) => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    let newPosts = [...postsData];

    // カテゴリーが "all" 以外の場合、カテゴリーでフィルタリング
    if (category !== 'all') {
      newPosts = newPosts.filter((post) =>
        post.node.categories.nodes.some((postCategory) => postCategory.name === category)
      );
    }

    // ソート
    if (sortOption === 'asc') {
      newPosts.sort((a, b) => new Date(a.node.date) - new Date(b.node.date));
    } else if (sortOption === 'des') {
      newPosts.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));
    }

    if (searchedKeyword) {
      newPosts = newPosts.filter((post) => {
        const titleMatch: boolean = post.node.title.includes(searchedKeyword);
        const contentMatch: boolean = post.node.content.includes(searchedKeyword);
        const isMatched: boolean = titleMatch || contentMatch;

        return isMatched;
      });
    }

    if (!searchedKeyword || newPosts.length > 0) {
      setHasMatchedResults(true);
    } else {
      setHasMatchedResults(false);
    }

    const filteredPosts = newPosts.slice(start, end);

    setChangePosts(filteredPosts);
    setTotalNumberOfArticles(newPosts.length);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    renderPostsData(newPage, selectedCategory);
  };

  const handleSortOrderPosts = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
    renderPostsData(1, newCategory);
  };

  const handleKeywordOrder = (newKeyword) => {
    setSearchedKeyword(newKeyword);
    setCurrentPage(1);
    renderPostsData(1, selectedCategory);
  }

  return (
    <Layout>
      {loading ? (
        <p className={Styles.loading}>
        <Image
          src="/images/loading-circle.gif"
          alt="loading..."
          width={150}
          height={150}
          style={{ width: '150', height: '150' }}
        />
      </p>
      ) : (
        <>
        <div className={Styles.mainContens}>
          {hasMatchedResults ? (
              <BlogArchive posts={changePosts} />
            ):(
              <div className={Styles.noKeyword}>
                <p className={Styles.noKeyword_text}>
                  対象の記事が見つかりませんでした。
                </p>
              </div>
            )
          }
          <SortComponent
            allPosts={postsData}
            sortOption={sortOption}
            onSortOrderChange={handleSortOrderPosts}
            onCategoryChange={handleCategoryChange}
            onKeywordOrderChange={handleKeywordOrder}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalNumberOfArticles={totalNumberOfArticles}
          pageSize={PAGE_SIZE}
        />
      </>
      )}
    </Layout>
  );
};

export default Home;
