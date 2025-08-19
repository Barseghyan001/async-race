import {
  deleteCarThunk,
  engineDriveThunk,
  engineStartThunk,
  engineStopThunk,
  getCarsThunk,
} from '../../../../../store/carsSlice/asyncThunks.ts';
import { carsActions, carsSliceSelectors } from '../../../../../store/carsSlice/carsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxHooks.ts';
import { useEffect, useState } from 'react';
import {
  createWinnersThunk,
  deleteWinnersThunk,
  getWinnerThunk,
} from '../../../../../store/winnersSlice/asyncThunks.ts';
import type { Props } from './CarItem.types.ts';

export const useControlCars = ({ id, name, color }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [transitionEnabled, setTransitionEnabled] = useState<boolean>(true);
  const [position, setPosition] = useState<number>(0);
  const dispatch = useAppDispatch();
  const distance = useAppSelector(carsSliceSelectors.selectorSelectedDistance);
  const velocity = useAppSelector(carsSliceSelectors.selectorSelectedVelocity);
  const allCarsStarted = useAppSelector(carsSliceSelectors.selectorAllCarsStarted);

  const handleRemoveCar = () => {
    dispatch(deleteCarThunk(id))
      .then(() => dispatch(getCarsThunk(0)))
      .then(() => dispatch(deleteWinnersThunk(id)));
  };

  const handleSelectCar = () => {
    dispatch(carsActions.setSelectedCar({ name, color, id }));
  };

  const handleStart = () => {
    dispatch(engineStartThunk(id));
    setSelectedId(id);
    dispatch(engineDriveThunk(id));
  };

  const handleStop = async () => {
    dispatch(engineStopThunk(id));
    setSelectedId(null);
    setTransitionEnabled(false);
    dispatch(carsActions.setCarsStarted(false));
    setPosition(0);
    setTimeout(() => setTransitionEnabled(true), 0);
  };

  useEffect(() => {
    if (allCarsStarted) {
      handleStart();
    }
  }, [allCarsStarted]);

  useEffect(() => {
    if (selectedId === id && distance > 0 && velocity > 0) {
      const speedFactor = 0.9;
      const travelTime = Math.floor((distance / velocity) * speedFactor);
      setPosition(0);
      const animationTimeout = setTimeout(() => {
        setPosition(distance);
      }, 0);

      const finishTimeout = setTimeout(() => {
        setSelectedId(null);
        dispatch(createWinnersThunk({ time: travelTime, wins: 1, id })).then(() =>
          dispatch(getWinnerThunk(id))
        );
      }, travelTime);

      return () => {
        clearTimeout(animationTimeout);
        clearTimeout(finishTimeout);
      };
    }
  }, [selectedId, distance, velocity, id, dispatch, name, color, allCarsStarted]);

  return {
    selectedId,
    allCarsStarted,
    distance,
    velocity,
    onStart: handleStart,
    onRemoveCar: handleRemoveCar,
    onSelectCar: handleSelectCar,
    onStopCar: handleStop,
    transitionEnabled,
    position,
  };
};
