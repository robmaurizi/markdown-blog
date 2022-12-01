import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

import { getAllPosts } from '../../utils/lib'
import NavBar from '../../components/Masthead';
import BlogGrid from '../../components/BlogGrid';

interface IParams extends ParsedUrlQuery {
  category: string
}

type Props = {
  posts: [{
    slug: string,
    frontmatter: {
      title: string;
      publishDate: string;
      description: string;
      featuredImage: {
          url: string;
          alt: string;
      }     
    }
  }]
}

const Blog = ({ posts }: Props) => {

  return (
    <div>
      <Head>
        <title>Blog | Hypertext Jockey</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />

      <BlogGrid posts={posts} />

    </div>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const posts = getAllPosts("content");
  return {
    props: { posts }
  };
};
  
export default Blog;