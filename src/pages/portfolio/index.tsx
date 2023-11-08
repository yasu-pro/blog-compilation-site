import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import strapiFetchAPI from '../api/strapiFetchAPI';
import Layout from '../../components/Layout';
import PortfolioArchive from '../../components/portfolio/PortfolioArchive'
import { GET_POSTS_BY_STRAPI_QUERY } from '../../graphql/StrapiGraphQLQuery';
import Styles from "../../styles/scss/pages/top.module.scss";
import { Contents } from "../../graphql/types/strapiType"

const Portfolio = () => {
    const [postsData, setPostsData] = useState<Contents[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [hasMatchedResults, setHasMatchedResults] = useState(true);

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
            const postDataContents: Contents[] = response.data?.contents?.data;

            setPostsData(postDataContents);

            if (postDataContents.length > 0) {
                setHasMatchedResults(true);
            } else {
                setHasMatchedResults(false);
            }

        } catch (err) {
            setError('データの取得に失敗しました');
            console.log('データの取得エラー:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title= {title}>
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
                                <PortfolioArchive posts={postsData} />
                            ):(
                                <div className={Styles.noKeyword}>
                                    <p className={Styles.noKeyword_text}>
                                        対象の記事が見つかりませんでした。
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </>
            )}
        </Layout>
    )
}

export default Portfolio;
