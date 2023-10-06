import React, { useState } from 'react';
import { Edge } from '../types/types';
import Styles from "../styles/scss/components/SortComponent.module.scss"

interface SortComponentProps {
    sortOption: string;
    onSortOrderChange: (sortOption: string) => void;
    allPosts: Edge[];
    onCategoryChange: (categoryName: string) => void;
    onKeywordOrderChange: (keyword: string) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({
    sortOption,
    onSortOrderChange,
    allPosts,
    onCategoryChange,
    onKeywordOrderChange
}) => {
    const [keyword, setKeyword] = useState('');
    const handleSortOrder = (sortOption: string) => {
        onSortOrderChange(sortOption);
    };

    const handleCategoryOrder = (categoryName: string) => {
        onCategoryChange(categoryName);
    }

    const handleKeywordOrder = () => {
        onKeywordOrderChange(keyword);
    }

    const categoryExtraction = () => {
        const categoryArray = allPosts.map((post) => (
            post.node.categories.nodes.map(category => {
                return category.name
            })
        ))
        const flatCategoryArray = categoryArray.flat();
        const uniqueCategories = [...new Set(flatCategoryArray)];

        return uniqueCategories
    }

    const createCategoryOptionTag = (uniqueCategoryArray: string[]) => {
        return (
            uniqueCategoryArray.map(category => (
                <option
                    key={category}
                    value={category}
                >
                    {category}
                </option>
            ))
        );
    }

    return (
        <div className={Styles.sort}>
            <p className={Styles.sort__head}>記事検索</p>
            <div className={Styles.sort__category}>
                <label className={Styles.sort__category_name} htmlFor="categories">カテゴリー検索 :</label>
                <select id="categories" name="category" onChange={(event) => handleCategoryOrder(event.target.value)}>
                    <option key="all" value="all">全て</option>
                    {createCategoryOptionTag(categoryExtraction())}
                </select>
            </div>

            <div className={Styles.sort__order}>
                <div>
                    <input className={Styles.sort__order_input}
                        type="radio"
                        id="asc"
                        name="sortOrder"
                        value="asc"
                        checked={sortOption === "asc"}
                        onChange={(event) => handleSortOrder(event.target.value)}
                    />
                    <label className={Styles.sort__order_label} htmlFor="asc">昇順</label>
                </div>

                <div>
                    <input className={Styles.sort__order_input}
                        type="radio"
                        id="des"
                        name="sortOrder"
                        value="des"
                        checked={sortOption === "des"}
                        onChange={(event) => handleSortOrder(event.target.value)}
                    />
                    <label className={Styles.sort__order_label} htmlFor="des">降順</label>
                </div>
            </div>

            <div className={Styles.sort__keyword}>
                <label className={Styles.sort__keyword_label} htmlFor="keyword">キーワード検索 :</label>
                <div>
                    <input
                        className={Styles.sort__keyword_input}
                        type="text"
                        name="keyword"
                        id="keyword"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button
                        className={Styles.sort__keyword_button}
                        type="submit"
                        onClick={() => handleKeywordOrder()}
                    >
                        キーワード検索
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SortComponent
