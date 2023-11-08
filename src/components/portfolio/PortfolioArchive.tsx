import React from 'react';
import { Attributes } from '../../graphql/types/strapiType';
import PortfolioItem from './PortfolioItem'

const PortfolioArchive: React.FC<{ posts: Attributes[] }> = ({ posts }) => {
    return (
        <div>
            <div>
                {posts.map((post, index) => (
                    <PortfolioItem key={index} post={post} />
                ))}
            </div>
        </div>
    );
}

export default PortfolioArchive;
