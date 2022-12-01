import {FC} from 'react';

import RhmImage from './RhmImage';
import styles from '../styles/RhmImage.module.scss';

interface RhmFigureProps {
  props: {
    children: [string],
    className: string,
  }
}
const RhmFigure:FC<RhmFigureProps> = (props) => {
  const { children } = props;
  const classNames = props.className.split(' ').map(className => styles[className]).join(' ');

  return (
    <figure className={classNames} data-columns={ props['data-cols'] }>
      { children.filter(el => {
        return typeof(el) !== 'string';
      }).map(el => {
        const { props } = el;
        const { children } = props;
        if ( props.node && props.node.tagName  === 'img') {
          return <RhmImage key={props.src} {...props} />
        }
        if ( children && typeof(children[0]) === 'string') {
          return <figcaption key={children} className={styles.figCaption}>{ children }</figcaption>
        }
        return <></>
      })}
    </figure>
  )
}

export default RhmFigure;