import { useEffect, useMemo, useState } from 'react';
import { getWinnersThunk } from '../../../store/winnersSlice/asyncThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks.ts';
import { winnersSliceSelectors } from '../../../store/winnersSlice/winnersSlice.ts';

export const PAGE_COUNT = 7;

export const useTableControl = () => {
  const [page, setPage] = useState<number>(0);
  const [sortedBy, setSortedBy] = useState<string>('');
  const dispatch = useAppDispatch();
  const winners = useAppSelector(winnersSliceSelectors.selectorWinners);
  const loading = useAppSelector(winnersSliceSelectors.selectorWinnersLoading);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const handleSortedBy = (type: string) => {
    setSortedBy(type);
  };

  const displayedWinners = useMemo(() => {
    return winners?.slice(page * PAGE_COUNT, page * PAGE_COUNT + PAGE_COUNT);
  }, [winners, page]);

  useEffect(() => {
    dispatch(getWinnersThunk({ page, sort: sortedBy }));
  }, [dispatch, sortedBy]);

  return {
    onPageChange: handlePageChange,
    onSortedBy: handleSortedBy,
    displayedWinners,
    loading,
    winners,
    page,
  };
};
