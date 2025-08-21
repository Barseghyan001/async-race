import type { Car } from './GenerateCars.types.ts';
import type { Dispatch } from '../../../../../store';
import { addCarThunk, getCarsThunk } from '../../../../../store/carsSlice/asyncThunks.ts';

const RANDOM_COLOR_LENGTH = 6;
const LETTERS_RANDOM_LENGTH = 16;
const GENERATE_CAR_LENGTH = 100;
const randomCarName = () => {
  const brands = ['Ford', 'BMW', 'Audi', 'Tesla', 'Toyota', 'Honda', 'Chevy', 'Mercedes'];
  const models = ['X', 'Y', 'Z', 'GT', 'S', 'Sport', 'Pro', 'Max'];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
};

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < RANDOM_COLOR_LENGTH; i++) {
    color += letters[Math.floor(Math.random() * LETTERS_RANDOM_LENGTH)];
  }
  return color;
};

const generateCars = async (dispatch: Dispatch) => {
  const cars: Car[] = Array.from({ length: GENERATE_CAR_LENGTH }, () => ({
    name: randomCarName(),
    color: randomColor(),
  }));

  try {
    await Promise.all(cars.map(car => dispatch(addCarThunk(car)))).then(() =>
      dispatch(getCarsThunk(0))
    );
  } catch (err) {
    console.error(err);
  }
};

export const helpers = {
  generateCars,
};
