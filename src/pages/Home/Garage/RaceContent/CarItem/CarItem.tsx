import { type FC } from 'react';
import type { Props } from './CarItem.types.ts';
import styles from './CarItem.module.css';
import Button from '../../../../../components/ui/Button/Button.tsx';
import { CarSvg } from '../../../../../assets/images';
import { disabledButton } from './helpers.ts';
import { useControlCars } from './hooks.ts';

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
      <div className={styles.buttonControllers}>
        <Button type="outline" onClick={onSelectCar}>
          select
        </Button>
        <Button type="outline" onClick={onStart} disabled={disabledStartButton}>
          a
        </Button>
        <Button type="outline" onClick={onRemoveCar}>
          remove
        </Button>
        <Button type="outline" onClick={onStopCar} disabled={disabledStopButton}>
          b
        </Button>
      </div>
      <div
        ref={carRef}
        className={styles.car}
        style={{
          transform: animation ? `translateX(${distance}px)` : 'translateX(0)',
          transition: animation ? `transform ${2}s linear` : 'none',
        }}
      >
        <CarSvg style={{ color }} />
      </div>
      <h1>{name}</h1>
    </li>
  );
};

export default CarItem;
