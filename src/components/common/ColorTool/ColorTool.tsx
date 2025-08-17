import styles from './ColorTool.module.css';
import Button from '../../ui/Button/Button.tsx';
import { type ChangeEvent, type FC, useEffect, useState } from 'react';
import type { Props } from './ColorTool.types.ts';

const ColorTool: FC<Props> = ({ buttonText, buttonType, onChange, selectedCar }) => {
  const [{ name, color }, setValue] = useState({
    name: '',
    color: '#000000',
  });

  useEffect(() => {
    setValue({
      name: selectedCar?.name ?? '',
      color: selectedCar?.color ?? '#000000',
    });
  }, [selectedCar]);

  const handleChange = (key: 'name' | 'color') => (e: ChangeEvent<HTMLInputElement>) => {
    setValue(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleClick = () => {
    if (!name.trim().length) return;

    onChange({ name, color });
    setValue({ name: '', color: '#000000' });
  };

  return (
    <div className={styles.wrapper}>
      <input type="text" value={name} onChange={handleChange('name')} />
      <input type="color" value={color} onChange={handleChange('color')} />
      <Button type={buttonType} onClick={handleClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ColorTool;
