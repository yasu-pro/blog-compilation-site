export type Post = {
  id: string
  title: string
  content: string
  postId: number
  date:string
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
    }[] | null;
  }[] | null;
}

export type Posts = {
  posts: Post[]
}
