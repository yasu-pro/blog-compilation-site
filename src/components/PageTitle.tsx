import React from "react";
import Styles from '../styles/scss/components/PageTitle.module.scss';

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={Styles.pageTitle}>
            <h1 className={Styles.title}>{title}</h1>
        </div>
    )
}

export default PageTitle;
