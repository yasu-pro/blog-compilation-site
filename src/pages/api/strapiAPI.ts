import React from 'react';
import { Edge } from '../../types/types';

interface PageInfo {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
}

interface PostsData {
    data: {
        posts: {
            pageInfo: PageInfo;
            edges: Edge[];
        };
    };
}

interface ProcessEnv {
    NEXT_PUBLIC_STRAPI_API_URL: string;
}

declare const process: {
    env: ProcessEnv;
};

const fetchAPI = async (query: string, variables: object): Promise<PostsData> => {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    }

    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Fetchエラー:', error);
        throw error;
    }
}

export default fetchAPI
