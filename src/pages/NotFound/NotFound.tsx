import styles from './NotFound.module.css';
import { ArrowLeft, SearchSlash } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className={styles.wrapper}>
      <h1>Not Found</h1>
      <SearchSlash />
      <Link to="/" className={styles.link}>
        <ArrowLeft />
        Back to Garage
      </Link>
    </section>
  );
};

export default NotFound;
