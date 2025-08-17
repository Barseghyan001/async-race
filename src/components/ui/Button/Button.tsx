import type { FC } from 'react';
import type { Props } from './Button.types.ts';
import styles from './Button.module.css';

const Button: FC<Props> = ({ children, type, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${styles[`button--${type}`]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
