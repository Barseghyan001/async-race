import styles from './Modal.module.css';
import { type FC, useEffect } from 'react';
import type { Props } from './Modal.styles.ts';
import Button from '../Button/Button.tsx';

const Modal: FC<Props> = ({ children, onClose, open }) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('dontScroll');
    }
    return () => {
      document.body.classList.remove('dontScroll');
    };
  }, [open]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.close} onClick={onClose} />
      <main className={styles.content}>
        <>
          {children}
          <Button type="outline" onClick={onClose}>
            close
          </Button>
        </>
      </main>
    </section>
  );
};

export default Modal;
