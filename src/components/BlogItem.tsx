import React from "react";
import Image from 'next/image';
import { format } from "date-fns";

const BlogItem: React.FC<{ postData: postDataType }> = ({ post }) => {

    const createCategoryTag: React.FC<{ categoryArray: string[] }> = ({ categoryArray }) => {
        return (
            categoryArray
                .filter((categoryData) => categoryData !== null)
                .map((categoryData, index) => (
                    <span className="text-xs md:text-sm font-semibold p-1 md:py-1 md:px-1.5 text-gray-500 bg-gray-200 rounded-md" key={index}>{categoryData}</span>
            ))
        )
    }

    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL as string;
    let postThumbnailUrl: string = "/images/noImage.jpg";
    let postThumbnailAlt: string = "ブログ画像"

    const content = {
        postUrl: `${baseUrl}${post.uri}`,
        title: post.title,
        content: post.content,
        date: format(new Date(post.date), "MMM yy, dd"),
        categoryArray: post.categories.nodes.map(categoryData => categoryData.name)
    }

    if (post.featuredImage) {
        content.eyecatch = {
            url: post.featuredImage.post.sourceUrl,
            alt: post.featuredImage.post.altText,
            height: post.featuredImage.posts.mediaDetails.height,
            width: post.featuredImage.posts.mediaDetails.width,
        }
    } else {
        content.eyecatch = {
            url: postThumbnailUrl,
            alt: postThumbnailAlt,
        }
    }

    return (
        <article className="h-full">
            <a href={content.postUrl} target="_blank" className="block h-full p-1 md:p-4 transition transform rounded-md hover:scale-105 hover:bg-gray-200">
                <div className="flex flex-col">
                    <div className="w-full h-240">
                        <Image className="object-cover w-full h-full rounded-lg" src={content.eyecatch.url} alt={content.eyecatch.alt} width={500} height={300} />
                    </div>
                    <div className="mt-2 md:mt-6">
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-400">{content.date}</span>
                            <div className="flex flex-wrap gap-1 md:gap-3 mt-1">
                                {createCategoryTag({ categoryArray: content.categoryArray })}
                            </div>
                        </div>
                        <div className="flex flex-col mt-1 md:mt-3">
                            <h2 className="text-base md:text-2xl font-semibold md:font-extrabold text-gray-900 md:leading-1.5 overflow-hidden line-clamp-2">{content.title}</h2>
                            <div className="mt-1 md:mt-2 leading-1.5 text-gray-500 text-xs md:text-base overflow-hidden line-clamp-4" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    )
}

export default BlogItem;
