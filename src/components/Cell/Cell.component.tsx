import clsx from 'clsx';
import type { ICell } from '../../types';
import './Cell.component.css';

type CellProps = ICell & {
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
};

// @TODO: add background colors support to the cell

export const Cell: React.FC<CellProps> = ({
  givenValue,
  insertedValue,
  cornerValues,
  centerValues,
  // colorValues,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  const isGivenValue = givenValue !== 0;
  const isInsertedValue = insertedValue !== 0;

  return (
    <button
      className={clsx('cell', {
        'cell--is-selected': isSelected,
      })}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {isGivenValue && (
        <span className='cell__value cell__value--dark'>
          {givenValue}
        </span>
      )}

      {isInsertedValue && (
        <span className='cell__value'>
          {insertedValue}
        </span>
      )}

      {!isInsertedValue && cornerValues?.map((value, index) => (
        <span
          className='cell__value cell__value--corner'
          key={index}
        >
          {value}
        </span>
      ))}

      {!isInsertedValue && centerValues && centerValues.length > 0 && (
        <span className='cell__value cell__value--center'>
          {centerValues.join('')}
        </span>
      )}
    </button>
  );
};
