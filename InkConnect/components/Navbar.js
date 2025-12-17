import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/about">About</Link> |{' '}
      <Link href="/ssg-demo">SSG Demo</Link>
    </nav>
  );
}
