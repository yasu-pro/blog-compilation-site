import { gql } from '@apollo/client';

export const GET_POSTS_BY_STRAPI_QUERY = `
    query contents {
        contents {
            data{
                id
                attributes {
                    title
                    slug
                    image {
                        data {
                            attributes {
                                url
                                width
                                height
                            }
                        }
                    }
                    image_sp {
                        data {
                            attributes {
                                url
                                width
                                height
                            }
                        }
                    }
                    content
                    whats_new
                }
            }
        }
        openGraphs {
            data{
            id
            attributes {
                slug
                type
                url
            }
            }
        }
    }
`;
