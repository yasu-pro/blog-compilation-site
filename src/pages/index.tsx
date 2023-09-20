import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BlogArchive from '../components/BlogArchive';
import PageTitle from '../components/PageTitle';
import { Post, Props } from '../types/types';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL as string;

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPosts = await getAllPosts();

        return fetchedPosts
      } catch (err) {
        setError('データの取得に失敗しました');
        console.error(err);
      }
    }

    fetchData();
  }, []);


  async function fetchAPI(query: any, { variables }: any = {}): Promise<object> {
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      console.error('Fetchエラー:', error);
      throw error;
    }
  }

  async function getAllPosts(limit = 100) {
    const variables = {
      limit,
    };
    const query = `
      query getAllSlugs {
        posts {
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

    try {
      const response = await fetchAPI(query, variables);
      const postsNodesData = response.posts.nodes

      setPosts(postsNodesData);

      return postsNodesData
    } catch (err) {
      console.log('~~ getAllPosts ~~');
      console.log(err);
      throw err;
    }
  }

  return (
    <main>
      <Header />
      <PageTitle title='Blog Compilation Site' />
      <BlogArchive posts={posts} />
      <Footer />
    </main>
  );
};

export default Home;
