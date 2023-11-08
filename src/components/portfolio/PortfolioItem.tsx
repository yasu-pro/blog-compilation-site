import React from 'react';
import Image from 'next/image';
import { Contents } from '../../graphql/types/strapiType'

const PortfolioItem: React.FC<{ post: Contents }> = ({ post }) => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL as string;
    const imagePath = `${baseUrl}${post.attributes.image.data.attributes.url}`;
    return (
        <article>
            <div>
                <h2>{post.attributes.title}</h2>
                <span>{post.attributes.slug}</span>
            </div>

            

            <img
                src={imagePath}
                alt='Strapi Image'
                width={500}
                height={500}
            />
        </article>
    )
};

export default PortfolioItem;
