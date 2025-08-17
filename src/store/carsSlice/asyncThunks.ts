import { createAsyncThunk } from '@reduxjs/toolkit';
import type { EngineData } from './initialState.ts';

const MAX_CARS_LIMIT = 1000;
const PORT = import.meta.env.VITE_SERVER_REQUEST_PORT || 3000;
const HOST = `http://localhost:${PORT}/`;

export interface Car {
  id: number;
  name: string;
  color: string;
}

export const getCarsThunk = createAsyncThunk<Car[], number, { rejectValue: string }>(
  'cars/get',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HOST}garage?_page=${page + 1}&_limit=${MAX_CARS_LIMIT}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      return await response.json();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const addCarThunk = createAsyncThunk<
  Car[],
  { name: string; color: string },
  { rejectValue: string }
>('cars/add', async (car, { rejectWithValue }) => {
  try {
    const res = await fetch(`${HOST}garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
    if (!res.ok) {
      throw new Error('Something went wrong!');
    }
    return await res.json();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return rejectWithValue(`Something went wrong: ${err.message}`);
    }
    return rejectWithValue('Something went wrong');
  }
});

export const deleteCarThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'cars/delete',
  async (carId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${HOST}garage/${carId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return carId;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const updateCarThunk = createAsyncThunk<Car, Car, { rejectValue: string }>(
  'cars/update',
  async (car, { rejectWithValue }) => {
    try {
      const res = await fetch(`${HOST}garage/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const engineStartThunk = createAsyncThunk<EngineData, number, { rejectValue: string }>(
  'cars/engine/start',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${HOST}engine?id=${id}&status=started`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const engineStopThunk = createAsyncThunk<void, number, { rejectValue: string }>(
  'cars/engine/stop',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${HOST}engine?id=${id}&status=stopped`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const engineDriveThunk = createAsyncThunk<void, number, { rejectValue: string }>(
  'cars/engine/drive',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${HOST}engine?id=${id}&status=drive`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return await res.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(`Something went wrong: ${err.message}`);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);
