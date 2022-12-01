import { FC } from 'react';
import styles from '../styles/PostFooter.module.scss';
import PublishDate from './PublishDate';
import PostTerms from './PostTerms';

interface PostFooterProps {
  frontmatter: {
    publishDate: string,
    tags: [string],
    category: [string]
  }
}

const PostFooter:FC<PostFooterProps> = ({frontmatter}) => {
  return (
    <div className={styles.postFooter}>
      <div className={styles.postByline}>
        <PublishDate date={frontmatter.publishDate} />
      </div>
      <div className={styles.postMeta}>
        <PostTerms tags={frontmatter.tags} categories={frontmatter.category}/>
      </div>
    </div>  

  )
}

export default PostFooter;