import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        Async <b>Race</b>
      </h1>
      <nav className={styles.nav}>
        <Link to="/" aria-label="go home">
          Garage
        </Link>
        <Link to="/winners" aria-label="go to winners">
          Winners
        </Link>
      </nav>
    </header>
  );
};

export default Header;
