export interface Edge {
  node: Post
}

export interface Post {
  id: string
  title: string
  content: string
  postId: number
  date: string
  slug: string
  uri: string
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: {
        height: number
        width: number
      } | null
    } | null
  } | null
  categories: {
    nodes: {
      name: string;
      link: string;
    }[];
  };
}
