import styles from './Empty.module.css';
import { Car } from 'lucide-react';

const Empty = ({ text }: { text: string }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.icon}>
        <Car />
      </div>
      <h1>{text}</h1>
    </section>
  );
};

export default Empty;
