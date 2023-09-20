import { gql } from '@apollo/client'

export const GraphqlQuery = gql`
    query getAllSlugs($limit: Int!) {
        posts(first: $limit)
            edges {
                node {
                    id
                    title
                    link
                    date
                    slug
                    content
                    featuredImage {
                        node {
                        sourceUrl
                        altText
                        }
                    }
                    categories {
                        nodes {
                        name
                        link
                        }
                    }
                }
            }
        }
    }
`
