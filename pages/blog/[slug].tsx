import {FC} from 'react'
import ReactMarkdown from "react-markdown";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";

import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Link from "next/link";
import Head from 'next/head'

import { getAllPosts, getSinglePost } from "../../utils/lib";
import NavBar from "../../components/Masthead";
import FeaturedImage from '../../components/FeaturedImage';
import PostFooter from "../../components/PostFooter";

import RhmFigure from '../../components/RhmFigure';
import RhmImage from '../../components/RhmImage';

import styles from '../../styles/Post.module.scss'

interface PostProps {
  content: string,
  frontmatter: {
    tags: [string],
    category: [string]
    title: string,
    publishDate: string,
    description: string,
    featuredImage: {
      url: string,
      alt: string
    }
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

const Post:FC<PostProps> = ({ content, frontmatter }) => {

  const pageTitle = `${frontmatter.title} | Blog | Hypertext Jockey`;

  return (
    <div>
      <Head>
        <title>{ pageTitle }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <FeaturedImage image={frontmatter.featuredImage} classes={styles.postFeaturedImage} />
        <div className={styles.postContainer}>
          <h1 className={styles.postTitle}>{frontmatter.title}</h1>
          <ReactMarkdown className={styles.postContent}
            components={{
              img: ({...props}) => <RhmImage src={props.src} alt={props.alt} />,
              a: ({node, ...props}) => <Link href={props.href ? props.href : ''} {...props} />,
              figure: ({node, className, children, ...props}) => <RhmFigure className={className} {...props}>{children}</RhmFigure>
            }}
            remarkPlugins={[[remarkUnwrapImages]]}
            rehypePlugins={[rehypeRaw]}
          >{content}</ReactMarkdown>    

          <PostFooter frontmatter={frontmatter} />
        </div>
      </main>    
    </div>
  )
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const post = await getSinglePost(slug, "content");
  return {
    props: { ...post },
  };
};

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = getAllPosts("content").map( ({slug}) => ({params: {slug} }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;