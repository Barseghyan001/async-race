import styles from './Table.module.css';
import { useEffect, useMemo, useState } from 'react';
import Item from './Item/Item.tsx';
import TableSkeleton from './Skeleton/Skeleton.tsx';
import { getWinnersThunk } from '../../../store/winnersSlice/asyncThunks.ts';
import Empty from '../../../components/ui/Empty/Empty.tsx';
import { Pagination } from '../../../components/ui/Pagination/Pagination.tsx';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks.ts';
import { winnersSliceSelectors } from '../../../store/winnersSlice/winnersSlice.ts';

const Table = () => {
  const [page, setPage] = useState(0);
  const winners = useAppSelector(winnersSliceSelectors.selectorWinners);
  const loading = useAppSelector(winnersSliceSelectors.selectorWinnersLoading);
  const dispatch = useAppDispatch();

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const displayedWinners = useMemo(() => {
    return winners.slice(page * 7, page * 7 + 7);
  }, [winners, page]);

  useEffect(() => {
    dispatch(getWinnersThunk(page));
  }, []);

  return (
    <>
      {loading && <TableSkeleton />}
      <ul className={styles.wrapper}>
        <li className={`${styles.item} ${styles[`item--info`]}`}>
          <div>No</div>
          <div>Car</div>
          <div>Name</div>
          <div>Wins</div>
          <div>Best Time (seconds)</div>
        </li>
        {displayedWinners.map(winner => (
          <Item key={winner.id} {...winner} />
        ))}
        {!displayedWinners.length && !loading && <Empty text="No Winners found!" />}
      </ul>
      {!!winners.length && (
        <Pagination
          pageCount={Math.ceil(winners.length / 7)}
          forcePage={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Table;
