import styles from './RaceContent.module.css';
import { useEffect, useMemo, useState } from 'react';
import RaceSkeleton from './Skeleton/Skeleton.tsx';
import CarList from './CarList/CarList.tsx';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useReduxHooks.ts';
import { carsSliceSelectors } from '../../../../store/carsSlice/carsSlice.ts';
import { getCarsThunk } from '../../../../store/carsSlice/asyncThunks.ts';
import Divider from '../../../../components/ui/Divider/Divider.tsx';
import { Pagination } from '../../../../components/ui/Pagination/Pagination.tsx';
import Empty from '../../../../components/ui/Empty/Empty.tsx';

const RaceContent = () => {
  const [page, setPage] = useState<number>(0);
  const cars = useAppSelector(carsSliceSelectors.selectorCar);
  const loading = useAppSelector(carsSliceSelectors.selectorCarLoading);
  const dispatch = useAppDispatch();

  const displayedCars = useMemo(() => {
    return cars.slice(page * 7, page * 7 + 7);
  }, [cars, page]);

  useEffect(() => {
    dispatch(getCarsThunk(page));
  }, [dispatch]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  return (
    <>
      <Divider />
      {loading && <RaceSkeleton />}
      <section className={styles.wrapper}>
        <CarList data={displayedCars} />
      </section>
      {!!cars.length && (
        <section className={styles.row}>
          <h1>Garage ({cars.length})</h1>
          <Pagination
            pageCount={Math.ceil(cars.length / 7)}
            forcePage={page}
            onPageChange={handlePageChange}
          />
        </section>
      )}
      {!displayedCars.length && !loading && <Empty text="No cars found." />}
      <Divider />
    </>
  );
};

export default RaceContent;
