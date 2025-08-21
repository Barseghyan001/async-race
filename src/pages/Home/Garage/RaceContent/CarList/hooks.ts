import { useEffect, useState } from 'react';
import { updateWinnerThunk } from '../../../../../store/winnersSlice/asyncThunks.ts';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxHooks.ts';
import {
  winnersActions,
  winnersSliceSelectors,
} from '../../../../../store/winnersSlice/winnersSlice.ts';
import { carsSliceSelectors } from '../../../../../store/carsSlice/carsSlice.ts';

export const useShowWinner = () => {
  const [open, setOpen] = useState(false);
  const winners = useAppSelector(winnersSliceSelectors.selectorWinners);
  const winner = useAppSelector(winnersSliceSelectors.selectorWinner);
  const cars = useAppSelector(carsSliceSelectors.selectorCar);
  const currentWinner = cars.find(item => item.id === winner?.id);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(winnersActions.setWinner({}));
    window.location.reload();
  };

  useEffect(() => {
    if (!winner?.id) return;
    const existingWinner = winners.find(w => w.id === winner?.id);
    setOpen(true);
    if (existingWinner) {
      dispatch(
        updateWinnerThunk({
          ...existingWinner,
          wins: existingWinner.wins + 1,
          time: Math.min(existingWinner.time, winner.time),
        })
      );
    }
  }, [winner]);

  return {
    open,
    currentWinner,
    onClose: handleClose,
    winner,
  };
};
