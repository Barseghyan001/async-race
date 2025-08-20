import {
  deleteCarThunk,
  engineDriveThunk,
  engineStartThunk,
  engineStopThunk,
  getCarsThunk,
} from '../../../../../store/carsSlice/asyncThunks.ts';
import { carsActions, carsSliceSelectors } from '../../../../../store/carsSlice/carsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useReduxHooks.ts';
import { useEffect, useRef, useState } from 'react';
import {
  createWinnersThunk,
  deleteWinnersThunk,
  getWinnerThunk,
} from '../../../../../store/winnersSlice/asyncThunks.ts';
import type { Props } from './CarItem.types.ts';

export const useControlCars = ({ id, name, color }: Props) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [animation, setAnimation] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const liRef = useRef<HTMLLIElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const velocity = useAppSelector(carsSliceSelectors.selectorSelectedVelocity);
  const allCarsStarted = useAppSelector(carsSliceSelectors.selectorAllCarsStarted);

  const distance = Math.floor(position - 130);

  const handleRemoveCar = () => {
    dispatch(deleteCarThunk(id))
      .then(() => dispatch(getCarsThunk(0)))
      .then(() => dispatch(deleteWinnersThunk(id)));
  };

  const handleSelectCar = () => {
    dispatch(carsActions.setSelectedCar({ name, color, id }));
  };

  const handleStop = async () => {
    dispatch(engineStopThunk(id));
    setSelectedId(null);
    setAnimation(false);
    dispatch(carsActions.setCarsStarted(false));
    setPosition(0);
  };

  const calculateDistance = () => {
    if (liRef.current && carRef.current) {
      const liRect = liRef.current.getBoundingClientRect();
      const carRect = carRef.current.getBoundingClientRect();
      const style = getComputedStyle(liRef.current);
      const paddingLeft = parseFloat(style.paddingLeft);
      const paddingRight = parseFloat(style.paddingRight);

      const maxDistance = liRect.width - carRect.width - paddingLeft - paddingRight;
      setPosition(maxDistance > 0 ? maxDistance : 0);
    }
  };

  const handleStart = () => {
    dispatch(engineStartThunk(id));
    setSelectedId(id);
    dispatch(engineDriveThunk(id));
    calculateDistance();
    setAnimation(true);
  };

  useEffect(() => {
    calculateDistance();
    window.addEventListener('resize', calculateDistance);
    return () => window.removeEventListener('resize', calculateDistance);
  }, []);

  useEffect(() => {
    if (allCarsStarted) {
      handleStart();
    }
  }, [allCarsStarted]);

  useEffect(() => {
    if (selectedId === id && distance > 0 && velocity > 0) {
      const speedFactor = 50;
      const travelTime = Math.floor((distance / velocity) * speedFactor);
      const finishTimeout = setTimeout(() => {
        setSelectedId(null);
        dispatch(createWinnersThunk({ time: travelTime, wins: 1, id })).then(() =>
          dispatch(getWinnerThunk(id))
        );
      }, travelTime);

      return () => {
        clearTimeout(finishTimeout);
      };
    }
  }, [selectedId, distance, velocity, id, dispatch, name, color, allCarsStarted]);

  return {
    velocity,
    distance,
    carRef,
    liRef,
    selectedId,
    allCarsStarted,
    onStart: handleStart,
    onRemoveCar: handleRemoveCar,
    onSelectCar: handleSelectCar,
    onStopCar: handleStop,
    animation,
  };
};
