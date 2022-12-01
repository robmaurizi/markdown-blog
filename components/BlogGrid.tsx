import {FC} from 'react';
import PostTeaser from './PostTeaser';
import styles from '../styles/Blog.module.scss';

interface BlogGridProps {
  posts: [{
    slug: string,
    frontmatter: {
      title: string,
      publishDate: string,
      description: string,
      featuredImage: {
        url: string,
        alt: string
      }
    }
  }]
}

const BlogGrid:FC<BlogGridProps> = ({posts}) => {
  return (
    <main className={styles.blogContainer}>
    { posts.map( post => {
      return (
        <PostTeaser isHomeTeaser={false} key={post.slug} postSlug={post.slug} postData={post.frontmatter} />
      )
    }) }
    </main>
  )
}

export default BlogGrid;