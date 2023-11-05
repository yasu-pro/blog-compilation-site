import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Layout from '../../components/Layout';
import strapiFetchAPI from '../api/strapiFetchAPI';
import { GET_POSTS_BY_STRAPI_QUERY } from '../../graphql/StrapiGraphQLQuery';
import Styles from "../../styles/scss/pages/top.module.scss";

const Portfolio = () => {
    const [postsData, setPostsData] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [changePosts, setChangePosts] = useState<Edge[]>([]);

    const first = 100;
    const PAGE_SIZE = 5;

    const title = "Portfolio Page"

    useEffect(() => {
        fetchData();
      },[])


    const fetchData = async () => {
        const query = GET_POSTS_BY_STRAPI_QUERY;
        const variables = {
          first: first,
          after: null,
        };
    
        try {
            const response = await strapiFetchAPI(query, variables);
            const postDataEdges = response.data?.contents?.data;

            console.log(postDataEdges);
            

            setPostsData(postDataEdges);
            setChangePosts(postDataEdges)
        } catch (err) {
            setError('データの取得に失敗しました');
            console.log('データの取得エラー:', err);
        } finally {
            setLoading(false);
        }
      };

    return (
        <Layout title={title}>
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

                </>
            )}
        </Layout>
    )
}

export default Portfolio;
