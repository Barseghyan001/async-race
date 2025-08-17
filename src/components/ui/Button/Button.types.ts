import type { ReactNode } from 'react';

export type Props = {
  type: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};
