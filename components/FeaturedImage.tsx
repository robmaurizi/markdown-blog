import { FC } from 'react';

import styles from '../styles/FeaturedImage.module.scss'

interface FeaturedImageProps {
  image: {
    url: string,
    alt: string
  },
  classes: string
}

const FeaturedImage:FC<FeaturedImageProps> = ({image, classes}) => {
  return image ? (
    <figure className={`${ styles.featuredImage } ${ classes }`}>
      <img src={image.url} alt={image.alt} />
    </figure>
  ) : <div className={`${ styles.featuredImage } ${ classes }`}></div>;
}
export default FeaturedImage;