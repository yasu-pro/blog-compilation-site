import React from 'react';
import { Edge } from "../types/types";
import BlogItem from "./BlogItem";
import Styles from "../styles/scss/components/BlogArchive.module.scss";

const BlogArchive: React.FC<{ posts: Edge[] }> = ({ posts }) => {
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
