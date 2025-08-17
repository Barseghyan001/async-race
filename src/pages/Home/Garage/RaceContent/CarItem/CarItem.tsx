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
    velocity,
    allCarsStarted,
    selectedId,
    onStart,
    onRemoveCar,
    onSelectCar,
    onStopCar,
    position,
    transitionEnabled,
  } = useControlCars({ name, id, color });

  const disabledStartButton = disabledButton({ type: 'start', id, allCarsStarted, selectedId });
  const disabledStopButton = disabledButton({ type: 'stop', id, allCarsStarted, selectedId });

  return (
    <li className={styles.item}>
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
        className={styles.icon}
        style={{
          transform: `translateX(${position}px)`,
          transition: transitionEnabled ? `transform ${distance / velocity}s linear` : 'none',
        }}
      >
        <CarSvg style={{ color }} />
      </div>
      <h1>{name}</h1>
    </li>
  );
};

export default CarItem;
