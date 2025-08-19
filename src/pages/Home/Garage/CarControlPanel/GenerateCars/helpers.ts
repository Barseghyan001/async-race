import type { Car } from './GenerateCars.types.ts';
import type { Dispatch } from '../../../../../store';
import { addCarThunk, getCarsThunk } from '../../../../../store/carsSlice/asyncThunks.ts';

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
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateCars = async (dispatch: Dispatch) => {
  const cars: Car[] = Array.from({ length: 100 }, () => ({
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
