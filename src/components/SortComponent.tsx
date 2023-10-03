import React, { useEffect, useState } from 'react';
import { Post } from '../types/types';
import Styles from "../styles/scss/components/SortComponent.module.scss"


const SortComponent = ({ sortOption, onSortChange }) => {
    const handleSortChange = (sortOption) => {
        // ソートオプションを親コンポーネントに伝える
        onSortChange(sortOption);
    };


    return (
        <div className={Styles.sort}>
            <p className={Styles.sort__head}>記事検索</p>
            <div className={Styles.sort__order}>
                <div>
                    <input className={Styles.sort__order_input}
                        type="radio"
                        id="asc"
                        name="sortOrder"
                        value="asc"
                        checked={sortOption === "asc"}
                        onChange={(event) => handleSortChange(event.target.value)}
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
                        onChange={(event) => handleSortChange(event.target.value)}
                    />
                    <label className={Styles.sort__order_label} htmlFor="des">降順</label>
                </div>
            </div>
            <div className={Styles.sort__category}>
                <label className={Styles.sort__category_name} htmlFor="categories">カテゴリー検索 :</label>
                <select id="categories" name="category">
                    <option value="javaScript">javaScript</option>
                    <option value="php">PHP</option>
                    <option value="react">React</option>
                    <option value="redux">Redux</option>
                </select>
            </div>

            <div className={Styles.sort__keyword}>
                <label className={Styles.sort__keyword_label} htmlFor="keyword">キーワード検索 :</label>
                <div>
                    <input className={Styles.sort__keyword_input} type="text" name="" id="keyword" />
                    <button className={Styles.sort__keyword_button} type="submit">検索</button>
                </div>
            </div>
        </div>
    )
}

export default SortComponent
