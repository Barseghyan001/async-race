import styles from '../CarControlPanel.module.css';
import { Play, RotateCcw } from 'lucide-react';
import Button from '../../../../../components/ui/Button/Button.tsx';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxHooks.ts';
import { carsActions, carsSliceSelectors } from '../../../../../store/carsSlice/carsSlice.ts';

const RaceControls = () => {
  const cars = useAppSelector(carsSliceSelectors.selectorCar);
  const dispatch = useAppDispatch();

  const handleStartedCars = () => {
    if (!cars.length) return;
    dispatch(carsActions.setCarsStarted(true));
  };

  return (
    <div className={styles.container}>
      <Button type="outline" onClick={handleStartedCars}>
        Race
        <div className={styles.icon}>
          <Play />
        </div>
      </Button>
      <Button type="outline" onClick={() => window.location.reload()}>
        Reset
        <div className={styles.icon}>
          <RotateCcw />
        </div>
      </Button>
    </div>
  );
};

export default RaceControls;
