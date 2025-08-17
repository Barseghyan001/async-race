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
  const [page, setPage] = useState<number>(0);
  const [sortedBy, setSortedBy] = useState<string>('');
  const winners = useAppSelector(winnersSliceSelectors.selectorWinners);
  const loading = useAppSelector(winnersSliceSelectors.selectorWinnersLoading);
  const dispatch = useAppDispatch();

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const handleSortedBy = (type: string) => {
    setSortedBy(type);
  };

  const displayedWinners = useMemo(() => {
    return winners.slice(page * 7, page * 7 + 7);
  }, [winners, page]);

  useEffect(() => {
    dispatch(getWinnersThunk({ page, sort: sortedBy }));
  }, [sortedBy]);

  return (
    <>
      {loading && <TableSkeleton />}
      <ul className={styles.wrapper}>
        <li className={`${styles.item} ${styles[`item--info`]}`}>
          <div role="button" onClick={() => handleSortedBy('id')}>
            No
          </div>
          <div>Car</div>
          <div>Name</div>
          <div role="button" onClick={() => handleSortedBy('wins')}>
            Wins
          </div>
          <div role="button" onClick={() => handleSortedBy('time')}>
            Best Time (seconds)
          </div>
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
