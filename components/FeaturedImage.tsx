import { FC } from 'react';
import Image from 'next/image';

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
      <Image src={image.url} alt={image.alt} width="1440" height="900" />
    </figure>
  ) : <div className={`${ styles.featuredImage } ${ classes }`}></div>;
}
export default FeaturedImage;