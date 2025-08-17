import { configureStore } from '@reduxjs/toolkit';
import { carsReducer } from './carsSlice/carsSlice.ts';
import { winnersReducer } from './winnersSlice/winnersSlice.ts';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    winners: winnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
