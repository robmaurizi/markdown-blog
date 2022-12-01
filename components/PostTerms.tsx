import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/PostTerms.module.scss';

interface PostTermProps {
  categories: [string],
  tags: [string]
}

const PostTerms: FC<PostTermProps> = ({categories, tags}) => {

  const tagsLinks = tags ? (
    <div className={styles.postMetaListTagged}>
      <strong>Tagged</strong> {tags.map((tag, index) => {
        return (
          <span key={tag}>
            <Link href={`/blog/tags/${tag}`}>{tag.replace(/-/g, ' ')}</Link>
            { index < tags.length - 1 ? ', ' : ''}
          </span>
        );
      })}
    </div>
  ) : null;

  const catLinks = categories ? (
    <div className={styles.postMetaListCategorized}>
      <strong>Categorized</strong> {categories.map((cat, index) => {
        return (
          <span key={cat}>
            <Link href={`/blog/category/${cat}`}>{cat.replace(/-/g, ' ')}</Link>
            { index < categories.length - 1 ? ', ' : ''}
          </span>
        );
      })}
    </div>
  ): null;
 
  return (
    <div className={styles.postMeta}>
      {catLinks}
      {tagsLinks}
    </div>
  );
}

export default PostTerms;