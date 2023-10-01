import React from "react";
import Image from 'next/image';
import { format } from "date-fns";
import { Post } from "../types/types";
import Styles from "../styles/scss/components/BlogItem.module.scss"

const BlogItem: React.FC<{ post: Post }> = ({ post }) => {

    const createCategoryTag: React.FC<{ categoryArray: (string | null)[] }> = ({ categoryArray }) => {
        return (
            categoryArray
                .filter((categoryData) => categoryData !== null)
                .map((categoryData, index) => (
                    <span className={Styles.contents__category_name} key={index}>{categoryData}</span>
            ))
        )
    }

    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL as string;

    let categoryArray: string[] = [];
    if (Array.isArray(post.categories)) {
        categoryArray = post.categories.flatMap(categoryData => {
            return categoryData?.nodes?.map(category => category?.name) || [];
        });
    }

    const content = {
        postUrl: `${baseUrl}${post.uri}`,
        title: post.title,
        content: post.content,
        date: format(new Date(post.date), "MMM yy, dd"),
        categoryArray: categoryArray,
        eyecatch: {
            url: post.featuredImage?.node?.sourceUrl,
            alt: post.featuredImage?.node?.altText,
            height: 320,
            width: 560,
        }

    }

    return (
        <article className={Styles.blogItem}>
            <a href={content.postUrl} target="_blank" className={Styles.blogItemLink}>
                <div className={Styles.blogItem__inner}>
                    <div className={Styles.blogItem__imgArea}>
                        <Image className={Styles.blogItem__imgArea_img} src={content.eyecatch.url ?? "/images/noImage.jpg"} alt={content.eyecatch.alt?? "ブログ画像"} width={500} height={300} />
                    </div>
                    <div className={Styles.blogItem__contents}>
                        <div className={Styles.contents__inner}>
                            <span className={Styles.contents_date}>{content.date}</span>
                            <div className={Styles.contents__category}>
                                {createCategoryTag({ categoryArray: content.categoryArray })}
                            </div>
                        </div>
                        <div className={Styles.contents__para}>
                            <h2 className={Styles.contents__para_title}>{content.title}</h2>
                            <div className={Styles.contents__para_description} dangerouslySetInnerHTML={{ __html: content.content }}></div>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    )
}

export default BlogItem;
