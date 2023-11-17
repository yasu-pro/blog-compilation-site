import React from 'react';
import { Attributes } from '../../graphql/types/strapiType';
import PortfolioItem from './PortfolioItem'
import Styles from '../../styles/scss/pages/portfolio/portfolioArchive.module.scss';

const PortfolioArchive: React.FC<{ posts: Attributes[] }> = ({ posts }) => {
    return (
        <div className={ Styles.portfolioContents }>
            <section className={ Styles.portfolioSection }>
                {posts.map((post, index) => (
                    <PortfolioItem key={index} post={post.attributes} />
                ))}
            </section>

            <div>
                <a href="#">prev</a>
                <a href="#">一覧</a>
                <a href='#'>next</a>
            </div>
        </div>
    );
}

export default PortfolioArchive;
