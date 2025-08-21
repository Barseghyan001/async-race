import styles from './ButtonControllers.module.css';
import Button from '../../../../../../components/ui/Button/Button.tsx';
import type { FC } from 'react';
import type { IProps } from './ButtonControllers.types.ts';

const ButtonControllers: FC<IProps> = ({
  onSelectCar,
  onStart,
  onRemoveCar,
  onStopCar,
  disabledStartButton,
  disabledStopButton,
}) => {
  return (
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
  );
};

export default ButtonControllers;
