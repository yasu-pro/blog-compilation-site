import Layout from '../../components/Layout';
import fetchAPI from '../api/fetchAPI';
import BlogArchive from '../../components/BlogArchive';
// import Pagination from '../../components/Pagination';
import { GET_POSTS_BY_CURSOR_QUERY } from '../../graphql/GraphQLQueries';

const PAGE_SIZE = 100;

function Page({ currentPage, totalPages, posts, pageInfo }) {

  // console.log("postspostspostsposts",posts);
  
  // ページネーションのクリック時に呼ばれる関数
  const handlePageChange = (currentPage) => {
    // 新しいページに対応する記事の範囲を計算
    const newStartIndex = (currentPage - 1) * PAGE_SIZE;
    const newEndIndex = newStartIndex + PAGE_SIZE - 1;

    // 新しい範囲内の記事データを表示
    const newPosts = posts.slice(newStartIndex, newEndIndex + 1);

    // ページ情報と記事データを更新
    setCurrentPage(currentPage);
    setDisplayedPosts(newPosts);
  };

  return (
    <Layout>
      <BlogArchive posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={pageInfo.hasPreviousPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}

export default Page;

// getServerSideProps 関数の修正
export async function getServerSideProps(context) {
  const { query } = context;
  console.log("hogehoge",context);
  const endCursor = query.endCursor

  console.log("endCursorendCursorendCursorendCursor",endCursor);
  
  
  const pageNumber = parseInt(query.page, 10);
  console.log("hogePageNumber",pageNumber);
  

  const variables = {
    first: PAGE_SIZE,
    after: null, // 初回のクエリなので after は null
  };

  const response = await fetchAPI(GET_POSTS_BY_CURSOR_QUERY, variables);

  if (response.errors) {
    console.error("GraphQLエラー:", response.errors);
    return {
      props: {
        posts: [],
        currentPage: 1,
        totalPages: 0,
      },
    };
  }

  const postsData = response.data.posts.edges;
  const pageInfo = response.data.posts.pageInfo;

  return {
    props: {
      posts: postsData,
      currentPage: pageNumber,
      pageInfo: pageInfo,
      totalPages: Math.ceil(pageInfo.endCursor / PAGE_SIZE),
    },
  };
}
