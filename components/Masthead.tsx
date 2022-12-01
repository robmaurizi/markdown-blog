import Link from 'next/link'
import styles from '../styles/Masthead.module.scss'
import { useRouter } from 'next/router';


const NavBar = () => {

  const router = useRouter();
  const currentRoute = router.pathname;
  
  return(
    <header className={styles.mastheadContainer}>
      <div>
        <h1 className={ styles.siteTitle }><Link href="/">Hypertext Jockey</Link></h1>
        <p className={ styles.siteDescription }>Miscellany &amp;c. of Rob Maurizi</p>
      </div>
      <nav className={ styles.siteNavigation }>
        <ul className={ styles.siteNavigationMenu }>
          <li className={ currentRoute === '/' ? styles.menuItemActive : styles.menuItem }><Link href="/">Home</Link></li>
          <li className={ currentRoute.indexOf('blog') !== -1 ? styles.menuItemActive : styles.menuItem }><Link href="/blog">Blog</Link></li>
          <li className={ currentRoute === '/resume' ? styles.menuItemActive : styles.menuItem }><Link href="/resume">Resume</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default NavBar;