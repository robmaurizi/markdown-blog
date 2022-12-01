import {Children} from 'react';
import RhmImage from './RhmImage';

import styles from '../styles/RhmImage.module.scss';

type RhmFigureProps = {
  className: string|undefined,
  children: React.ReactNode | React.ReactNode[]
}
const RhmFigure = ({className, children}: RhmFigureProps) => {
 
  const classNames = className ? className.split(' ').map(className => styles[className]).join(' ') : '';
 
  return (
    <figure className={classNames}>
      { children }
    </figure>
  )
}

export default RhmFigure;