import type { ICars } from '../../../store/carsSlice/initialState.ts';

export type Props = {
  buttonText: string;
  buttonType: string;
  selectedCar?: ICars | null;
  onChange: (value: { name: string; color: string; id?: number }) => void;
};
