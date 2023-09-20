import React from "react";
import '../styles/PageTitle.module.css';

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className="mt-8 md:mt-12 pageTopImage">
            <h1 className="text-2xl font-bold md:text-3xl text-center ">{title}</h1>
        </div>
    )
}

export default PageTitle;
