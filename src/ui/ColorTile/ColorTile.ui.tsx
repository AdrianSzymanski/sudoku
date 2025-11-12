import clsx from 'clsx';
import type { Digit } from '@types';
import './ColorTile.ui.css';

type ColorTileProps = {
  colorIndex: Digit;
};

export const ColorTile: React.FC<ColorTileProps> = ({ colorIndex }) => {
  return (
    <div className={clsx('color-tile', `color-tile--${colorIndex}`)} />
  );
};
