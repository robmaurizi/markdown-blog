import { FC } from 'react';
import Link from 'next/link';

import styles from '../styles/PostTeaser.module.scss'

import PublishDate from './PublishDate';
import FeaturedImage from './FeaturedImage';

interface PostTeaserProps {
  postSlug: string,
  postData: {
    title: string,
    publishDate: string,
    description: string,
    featuredImage: {
      url: string,
      alt: string
    }
  },
  isHomeTeaser: boolean
}

const PostTeaser:FC<PostTeaserProps> = ( {postSlug, postData, isHomeTeaser=false} ) => {

  const articleClasses = [
    styles.postTeaser,
    postData.featuredImage ? styles.postTeaser__hasThumbnail : undefined,
    isHomeTeaser ? styles.postTeaser__isHomeTeaser : undefined,
  ]
  return (
    <article className={ articleClasses.join(' ')}>
      { postData.featuredImage && (
        <Link href={`/blog/${ postSlug }`} className={styles.postTeaserImageContainer}>
          <FeaturedImage image={postData.featuredImage } classes=''/>
        </Link>
      )}
      { !postData.featuredImage && (
        <div className={styles.emptyFeaturedImage} />
      )}
      <div className={styles.postTeaserContent}>
        { isHomeTeaser && (
          <div className={styles.postEyebrow}>From the Blog</div>
        ) }
        <h1 className={styles.postTitle}>
          <Link href={`/blog/${ postSlug }`}>{ postData.title }</Link>
        </h1>
        { !isHomeTeaser && (
          <div className={styles.postByline}>
            <PublishDate date={ postData.publishDate }/>
          </div>
        ) }
        <div className={styles.postExcerpt}>
          <p>{ postData.description }</p>
        </div>
        { isHomeTeaser && (
          <div className={styles.postReadMore}>
            <Link href={`/blog/${ postSlug }`}><span>Continue Reading</span> →</Link>
          </div>
        )}
      </div>
    </article>
  )
}

export default PostTeaser;