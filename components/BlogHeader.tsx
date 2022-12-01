import {FC} from 'react';
import styles from '../styles/BlogHeader.module.scss';

const BlogHeader = ({term, termType}) => {

  return (
    <header className={styles.container}>
      <h1 className={styles.title}>
        { `${termType} Archive: ` }
        <span className={styles.termName}>{term}</span>  
      </h1>
    </header>
  )

}

export default BlogHeader;