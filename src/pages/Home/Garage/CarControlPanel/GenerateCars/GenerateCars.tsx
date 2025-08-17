import styles from './GenerateCars.module.css';
import { helpers } from './helpers.ts';
import { useAppDispatch } from '../../../../../hooks/useReduxHooks.ts';
import Button from '../../../../../components/ui/Button/Button.tsx';

const GenerateCars = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <Button type="outline" onClick={() => helpers.generateCars(dispatch)}>
        Generate Cars
      </Button>
    </div>
  );
};

export default GenerateCars;
