import { type FC } from 'react';
import type { Props } from './CarItem.types.ts';
import styles from './CarItem.module.css';
import { CarSvg } from '../../../../../assets/images';
import { disabledButton } from './helpers.ts';
import { useControlCars } from './hooks.ts';
import { SECONDS_ANIMATION } from './constants.ts';
import ButtonControllers from './ButtonControllers/ButtonControllers.tsx';

const CarItem: FC<Props> = ({ name, color, id }) => {
  const {
    distance,
    carRef,
    liRef,
    allCarsStarted,
    selectedId,
    onStart,
    onRemoveCar,
    onSelectCar,
    onStopCar,
    animation,
  } = useControlCars({ name, id, color });

  const disabledStartButton = disabledButton({ type: 'start', id, allCarsStarted, selectedId });
  const disabledStopButton = disabledButton({ type: 'stop', id, allCarsStarted, selectedId });

  return (
    <li ref={liRef} className={styles.item}>
      <ButtonControllers
        onStart={onStart}
        onRemoveCar={onRemoveCar}
        onSelectCar={onSelectCar}
        onStopCar={onStopCar}
        disabledStartButton={disabledStartButton}
        disabledStopButton={disabledStopButton}
      />
      <div
        ref={carRef}
        className={styles.car}
        style={{
          transform: animation ? `translateX(${distance}px)` : 'translateX(0)',
          transition: animation ? `transform ${SECONDS_ANIMATION}s linear` : 'none',
        }}
      >
        <CarSvg style={{ color }} />
      </div>
      <h1>{name}</h1>
    </li>
  );
};

export default CarItem;
