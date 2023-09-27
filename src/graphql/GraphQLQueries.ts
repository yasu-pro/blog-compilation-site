import { gql } from '@apollo/client';

export const GET_POSTS_BY_CURSOR_QUERY = `
  query GetPostsByCursor($first: Int, $cursor: String) {
    posts(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          postId
          date
          content
          title
          slug
          uri
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                height
                width
              }
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
`;
