const API_URL = process.env.WORDPRESS_API_URL as string;

const query = `
  query getAllSlugs {
    posts {
      nodes {
        id
        postId
        date
        content
        title
        slug
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
`

export const fetchAPI = async (
  query: any,
  { variables }: any = {}
): Promise<object> => {
  const headers = { 'Content-Type': 'application/json' };

  let response;
  try {
    response = await fetch(API_URL, {
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
  } catch (error) {
    console.error('Fetchエラー:', error);
    throw error;
  }
  return response;
};

export async function getAllPosts(limit = 100) {
  const variables = {
    limit,
  }

  try {
    const response = await fetchAPI(query, variables)

    const contents = response.posts.nodes.map((node) => {
      const content = {
        title: node.title,
        slug: node.slug,
      }

      if (node.featuredImage) {
        content.eyecatch = {
          url: node.featuredImage.node.sourceUrl,
          height: node.featuredImage.node.mediaDetails.height,
          width: node.featuredImage.node.mediaDetails.width,
        }
      }

      return content
    })

    return contents
  } catch (err) {
    console.log('~~ getAllPosts ~~')
    console.log(err)
  }
}


