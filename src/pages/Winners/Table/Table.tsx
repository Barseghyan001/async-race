import styles from './Table.module.css';
import Item from './Item/Item.tsx';
import TableSkeleton from './Skeleton/Skeleton.tsx';
import Empty from '../../../components/ui/Empty/Empty.tsx';
import { Pagination } from '../../../components/ui/Pagination/Pagination.tsx';
import { PAGE_COUNT, useTableControl } from './hooks.ts';

const Table = () => {
  const { loading, onPageChange, onSortedBy, displayedWinners, winners, page } = useTableControl();

  return (
    <>
      {loading && <TableSkeleton />}
      <ul className={styles.wrapper}>
        <li className={`${styles.item} ${styles[`item--info`]}`}>
          <div role="button" onClick={() => onSortedBy('id')}>
            No
          </div>
          <div>Car</div>
          <div>Name</div>
          <div role="button" onClick={() => onSortedBy('wins')}>
            Wins
          </div>
          <div role="button" onClick={() => onSortedBy('time')}>
            Best Time (seconds)
          </div>
        </li>
        {displayedWinners?.map(winner => (
          <Item key={winner.id} {...winner} />
        ))}
        {!winners?.length && !loading && <Empty text="No Winners found!" />}
      </ul>
      {!!winners?.length && (
        <Pagination
          pageCount={Math.ceil(winners?.length / PAGE_COUNT)}
          forcePage={page}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default Table;
