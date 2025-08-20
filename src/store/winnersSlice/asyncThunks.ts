import { createAsyncThunk } from '@reduxjs/toolkit';
import type { IWinners, Winner } from './initialState.ts';
import { getCarsThunk } from '../carsSlice/asyncThunks.ts';

const MAX_WINNERS_LIMIT = 100;

const PORT = import.meta.env.VITE_SERVER_REQUEST_PORT || 3000;
const HOST = `http://localhost:${PORT}/`;

export const getWinnersThunk = createAsyncThunk<
  IWinners[],
  { page: number; sort: string },
  { rejectValue: string }
>('winners/get', async ({ page, sort }, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(
      `${HOST}winners?_page=${page + 1}&_limit=${MAX_WINNERS_LIMIT}&_sort=${sort}`
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const winners = await response.json();

    const cars = await dispatch(getCarsThunk(0)).unwrap();

    const newData = winners.map((winner: IWinners) => {
      const car = cars.find(c => c.id === winner.id);
      return car ? { ...winner, name: car.name, color: car.color } : winner;
    });

    return newData;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      rejectWithValue(err.message);
    }
    rejectWithValue('Something went wrong!');
  }
});

export const createWinnersThunk = createAsyncThunk<IWinners, Winner, { rejectValue: string }>(
  'winners/create',
  async (winner, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HOST}winners`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        rejectWithValue(err.message);
      }
      rejectWithValue('Something went wrong!');
    }
  }
);

export const deleteWinnersThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'winners/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HOST}winners/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return id;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Something went wrong!');
    }
  }
);

export const getWinnerThunk = createAsyncThunk<IWinners, number, { rejectValue: string }>(
  'winner/get',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${HOST}winners/${id}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue('Something went wrong!');
    }
  }
);

export const updateWinnerThunk = createAsyncThunk<IWinners, Winner, { rejectValue: string }>(
  'winner/update',
  async (winner, { rejectWithValue }) => {
    try {
      const resp = await fetch(`${HOST}winners/${winner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
      });
      if (!resp.ok) {
        throw new Error('Something went wrong!');
      }
      return await resp.json();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        rejectWithValue(err.message);
      }
    }
  }
);
