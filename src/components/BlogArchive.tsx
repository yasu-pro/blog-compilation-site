import React from "react";
import type { Post } from "../types/types";
import BlogItem from "./BlogItem";

type BlogArchiveProps = {
    posts: Post[];
};

const BlogArchive: React.FC<BlogArchiveProps> = ({ posts }) => {
console.log({posts});

    return (
        <div className="mt-5 md:mt-10 px-2 md:pr-8">
            <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 md:gap-8 justify-center">
                {posts.map((post, index) => (
                    <BlogItem key={ index } post={ post } />
                ))}
            </div>
        </div>
    );
};

export default BlogArchive;
