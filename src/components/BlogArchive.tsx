import React from "react";
import type { Posts } from "../types/types";
import BlogItem from "./BlogItem";

const BlogArchive: React.FC<Posts> = ({ posts }) => {

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
