import styles from '../Table.module.css';
import type { FC } from 'react';
import type { Props } from './Item.types.ts';
import { useAppDispatch } from '../../../../hooks/useReduxHooks.ts';
import { deleteWinnersThunk, getWinnersThunk } from '../../../../store/winnersSlice/asyncThunks.ts';
import { CarSvg } from '../../../../assets/images';

const Item: FC<Props> = ({ id, color, name, wins, time }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteWinnersThunk(id)).then(() => dispatch(getWinnersThunk(0)));
  };

  return (
    <li key={id} className={styles.item} role="button" onClick={handleDelete}>
      <div>{id}</div>
      <div>
        <div className={styles.icon}>
          <CarSvg style={{ color: color }} />
        </div>
      </div>
      <div>{name}</div>
      <div>{wins}</div>
      <div>Best Time ({time.toFixed(1)})</div>
    </li>
  );
};

export default Item;
