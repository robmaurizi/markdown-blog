import Image from 'next/image';
import {FC} from 'react';

import styles from '../styles/RhmImage.module.scss';

interface RhmImageProps {
  src: string,
  alt: string
}

const RhmImage:FC<RhmImageProps> = (props) => {
  const { src, alt } = props;
  let imgAtts = src.substring(src.indexOf('#!')).replace('#!','');
  const attributes = Object.fromEntries(imgAtts.split('&').map(att => att.split('=') ));
  // console.log(attributes);
  const _classname = attributes.align ? `align_${attributes.align}` : '';
  // console.log(_classname);
  return (
    <figure className={styles[_classname]}>
      <Image src={ src } alt={ alt } width={attributes.width} height={attributes.height} />
      <figcaption className={styles.figCaption}>{ alt }</figcaption>
    </figure>
  )
}

export default RhmImage;