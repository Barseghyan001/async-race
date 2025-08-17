export interface IWinners {
  id: number;
  wins: number;
  time: number;
  color: string;
  name: string;
}

export type Winner = Pick<IWinners, 'id' | 'time' | 'wins'>;

type InitialData = {
  winners: IWinners[];
  loading: boolean;
  error: string | null | unknown;
  winner: IWinners | null;
};

export const initialState: InitialData = {
  winners: [],
  loading: false,
  error: null,
  winner: null,
};
