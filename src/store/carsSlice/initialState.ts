export interface ICars {
  id: number;
  color: string;
  name: string;
}

export type InitialData = {
  cars: ICars[];
  loading: boolean;
  error: string | null | unknown;
  selectedCar: ICars | null;
  velocity: number;
  distance: number;
  allCarsStarted: boolean;
};

export type EngineData = Pick<InitialData, 'velocity' | 'distance'>;

export const initialState: InitialData = {
  cars: [],
  loading: false,
  error: null,
  selectedCar: null,
  velocity: 0,
  distance: 0,
  allCarsStarted: false,
};
