export interface IProps {
  onSelectCar: () => void;
  onStart: () => void;
  onRemoveCar: () => void;
  onStopCar: () => void;
  disabledStartButton: boolean | undefined;
  disabledStopButton: boolean | undefined;
}
