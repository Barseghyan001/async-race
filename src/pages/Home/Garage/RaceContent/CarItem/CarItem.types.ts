export type Props = {
  id: number;
  color: string;
  name: string;
};

export type DisabledButtonTypes = {
  id: number;
  type: string;
  selectedId: number | string | null;
  allCarsStarted: boolean;
};
