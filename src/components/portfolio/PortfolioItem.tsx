import React from 'react';
import Image from 'next/image';
import Styles from '../../styles/scss/pages/portfolio/portfolioArchive.module.scss';
import { Contents } from '../../graphql/types/strapiType'

const PortfolioItem: React.FC<{ post: Contents }> = ({ post }) => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string;
    const imagePath = `${baseUrl}${post.image.data.attributes.url}`;
    return (
        <article className={Styles.portfolioItem}>
            <a className={Styles.portfolioItem__link} href="#">
                <div className={Styles.portfolioItem__heading}>
                    <h2 className={Styles.title}>{post.title}</h2>
                    <div className={Styles.slug}>
                        <span className={Styles.slug__text}>{post.slug}</span>
                    </div>
                </div>

                <div className={Styles.portfolioItem__img}>
                    <img
                        src={imagePath}
                        alt='Strapi Image'
                        width={500}
                        height={500}
                    />
                </div>
            </a>
        </article>
    )
};

export default PortfolioItem;
