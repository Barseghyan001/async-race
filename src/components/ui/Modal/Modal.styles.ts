import React from 'react';

export type Props = {
  onClose?: () => void;
  children: React.ReactNode;
  open: boolean;
};
