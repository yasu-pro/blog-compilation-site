import React, { useEffect, useState } from 'react';
import type { Posts } from "../types/types";
import BlogItem from "./BlogItem";
import Styles from "../styles/scss/components/BlogArchive.module.scss";

const BlogArchive: React.FC<Posts> = ({ posts }) => {
    return (
        <div className={Styles.blogContents}>
            <div className={Styles.blogContents__inner}>
                {posts.map((post, index) => (
                    <BlogItem key={index} post={post.node} />
                ))}
            </div>
        </div>
    );
};

export default BlogArchive;
