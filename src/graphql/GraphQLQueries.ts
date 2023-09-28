import { gql } from '@apollo/client';

export const GET_POSTS_BY_CURSOR_QUERY = `
  query GetAllPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
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
