import React from "react";
import type { Posts } from "../types/types";
import BlogItem from "./BlogItem";


const BlogArchive: React.FC<Posts> = ({ posts }) => {

    // console.log({posts});
    

    return (
        <div className="px-2 mt-5 md:mt-10 md:pr-8">
            <div className="grid justify-center grid-cols-2 gap-1 lg:grid-cols-3 md:gap-8">
                {posts.map((post, index) => (
                    <BlogItem key={ index } post={ post.node } />
                ))}
            </div>
        </div>
    );
};

export default BlogArchive;
