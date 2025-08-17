import styles from './Divide.module.css';
import { divideImage } from '../../../assets/images/index.ts';

const Divider = () => {
  return (
    <div className={styles.divider}>
      <hr />
      <div className={styles.image}>
        <img src={divideImage} alt="road-image" />
      </div>
      <hr />
    </div>
  );
};

export default Divider;
