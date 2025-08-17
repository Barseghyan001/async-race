import styles from './Winners.module.css';
import Table from './Table/Table.tsx';

const Winners = () => {
  return (
    <section className={styles.wrapper}>
      <h1>Winners</h1>
      <Table />
    </section>
  );
};

export default Winners;
