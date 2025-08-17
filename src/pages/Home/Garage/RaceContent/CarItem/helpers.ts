import type { DisabledButtonTypes } from './CarItem.types.ts';

export const disabledButton = ({ type, id, selectedId, allCarsStarted }: DisabledButtonTypes) =>
  ({
    start: selectedId ? selectedId === id : allCarsStarted,
    stop: selectedId ? selectedId !== id : !allCarsStarted,
  })[type];
