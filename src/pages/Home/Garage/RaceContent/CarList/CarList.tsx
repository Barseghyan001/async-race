import { type FC } from 'react';
import CarItem from '../CarItem/CarItem.tsx';
import type { Props } from './CarList.types.ts';
import styles from './CarList.module.css';
import { createPortal } from 'react-dom';
import { finishImage } from '../../../../../assets/images';
import Modal from '../../../../../components/ui/Modal/Modal.tsx';
import { useShowWinner } from './hooks.ts';

const FIXED_NUMBER = 2;

const CarList: FC<Props> = ({ data }) => {
  const { open, onClose, currentWinner, winner } = useShowWinner();

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
          <Modal onClose={onClose} open={open}>
            <h5>🏆 Winner!</h5>
            <p>{currentWinner?.name} reached the finish line!</p>
            <p>Time: {winner?.time.toFixed(FIXED_NUMBER)}s</p>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default CarList;
