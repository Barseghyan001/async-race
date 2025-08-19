import { type FC, useEffect, useState } from 'react';
import CarItem from '../CarItem/CarItem.tsx';
import type { Props } from './CarList.types.ts';
import styles from './CarList.module.css';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxHooks.ts';
import {
  winnersActions,
  winnersSliceSelectors,
} from '../../../../../store/winnersSlice/winnersSlice.ts';
import { finishImage } from '../../../../../assets/images';
import Modal from '../../../../../components/ui/Modal/Modal.tsx';
import { updateWinnerThunk } from '../../../../../store/winnersSlice/asyncThunks.ts';
import { carsSliceSelectors } from '../../../../../store/carsSlice/carsSlice.ts';

const CarList: FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const cars = useAppSelector(carsSliceSelectors.selectorCar);
  const winner = useAppSelector(winnersSliceSelectors.selectorWinner);

  const currentWinner = cars.find(item => item.id === winner?.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (winner?.id) {
      setOpen(true);
      dispatch(updateWinnerThunk(winner));
    }
  }, [winner]);

  const handleClose = () => {
    setOpen(false);
    dispatch(winnersActions.setWinner({}));
    window.location.reload();
  };

  return (
    <>
      <ul className={styles.wrapper}>
        {data.map(item => (
          <CarItem key={item.id} {...item} />
        ))}
      </ul>
      <div className={`${styles.image} ${styles[`image--finish`]}`}>
        <img src={finishImage} alt="finishImage" />
      </div>
      {open &&
        createPortal(
          <Modal onClose={handleClose} open={open}>
            <h5>🏆 Winner!</h5>
            <p>{currentWinner?.name} reached the finish line!</p>
            <p>Time: {winner?.time.toFixed(2)}s</p>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default CarList;
