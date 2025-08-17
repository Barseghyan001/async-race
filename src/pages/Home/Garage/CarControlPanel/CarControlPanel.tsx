import styles from './CarControlPanel.module.css';
import RaceControls from './RaceControls/RaceControls.tsx';
import GenerateCars from './GenerateCars/GenerateCars.tsx';
import { carsActions, carsSliceSelectors } from '../../../../store/carsSlice/carsSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useReduxHooks.ts';
import {
  addCarThunk,
  getCarsThunk,
  updateCarThunk,
} from '../../../../store/carsSlice/asyncThunks.ts';
import ColorTool from '../../../../components/common/ColorTool/ColorTool.tsx';

const CarControlPanel = () => {
  const selectedCar = useAppSelector(carsSliceSelectors.selectorSelectedCar);

  const dispatch = useAppDispatch();

  const handleAddCar = ({ name, color }: { name: string; color: string }) => {
    const car = {
      name,
      color,
    };
    dispatch(addCarThunk(car)).then(() => dispatch(getCarsThunk(0)));
  };

  const handleUpdateCar = ({ name, color }: { name: string; color: string }) => {
    if (!selectedCar?.id) return;
    const updatedCar = {
      id: selectedCar?.id,
      name,
      color,
    };
    dispatch(updateCarThunk(updatedCar))
      .then(() => dispatch(getCarsThunk(0)))
      .then(() => dispatch(carsActions.setSelectedCar(null)));
  };

  return (
    <section className={styles.section}>
      <RaceControls />
      <ColorTool buttonText="create" buttonType="outline" onChange={handleAddCar} />
      <ColorTool
        buttonText="update"
        buttonType="outline"
        onChange={handleUpdateCar}
        selectedCar={selectedCar}
      />
      <GenerateCars />
    </section>
  );
};

export default CarControlPanel;
