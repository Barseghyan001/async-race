import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState.ts';
import { deleteCarThunk, engineStartThunk, getCarsThunk, updateCarThunk } from './asyncThunks.ts';

const carsSlice = createSlice({
  initialState,
  name: 'cars',
  reducers: {
    setSelectedCar: (state, action) => {
      state.selectedCar = action.payload;
    },
    setCarsStarted: (state, action) => {
      state.allCarsStarted = action.payload;
    },
  },
  selectors: {
    selectorCar: state => state.cars,
    selectorCarLoading: state => state.loading,
    selectorCarError: state => state.error,
    selectorSelectedCar: state => state.selectedCar,
    selectorSelectedDistance: state => state.distance,
    selectorSelectedVelocity: state => state.velocity,
    selectorAllCarsStarted: state => state.allCarsStarted,
  },
  extraReducers: builder => {
    builder
      .addCase(getCarsThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCarsThunk.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(getCarsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCarThunk.fulfilled, (state, action) => {
        const updatedCar = state.cars.find(car => car.id === action.payload.id);
        state.cars = state.cars.map(item => ({ ...item, updatedCar }));
      })
      .addCase(deleteCarThunk.fulfilled, (state, action) => {
        state.cars = state.cars.filter(item => item.id !== action.payload);
      })
      .addCase(engineStartThunk.fulfilled, (state, action) => {
        state.distance = action.payload.distance;
        state.velocity = action.payload.velocity;
      });
  },
});

export const carsReducer = carsSlice.reducer;
export const { selectors: carsSliceSelectors, actions: carsActions } = carsSlice;
