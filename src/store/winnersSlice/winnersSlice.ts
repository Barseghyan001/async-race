import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState.ts';
import { getWinnersThunk, getWinnerThunk, updateWinnerThunk } from './asyncThunks.ts';

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  selectors: {
    selectorWinners: state => state.winners,
    selectorWinnersLoading: state => state.loading,
    selectorWinner: state => state.winner,
  },
  reducers: {
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getWinnersThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWinnersThunk.fulfilled, (state, action) => {
        state.winners = action.payload;
        state.loading = false;
      })
      .addCase(getWinnersThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getWinnerThunk.fulfilled, (state, action) => {
        state.winner = action.payload;
      })
      .addCase(updateWinnerThunk.fulfilled, (state, action) => {
        const updatedCar = state.winners.find(winner => winner.id === action.payload.id);
        state.winners = state.winners.map(item => ({ ...item, updatedCar }));
      }),
});

export const { selectors: winnersSliceSelectors, actions: winnersActions } = winnersSlice;
export const winnersReducer = winnersSlice.reducer;
