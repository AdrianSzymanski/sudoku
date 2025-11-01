import clsx from 'clsx';
import './Cell.ui.css';

type CellProps = {
  given: number;
  inserted: number;
  pencilMarks: number[];
  candidates: number[];
  colors: number[];
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
};

// @TODO: add background colors support to the cell
// @TODO: don't allow to edit the given value (merge given and inserted?)

export const Cell: React.FC<CellProps> = ({
  given,
  inserted,
  pencilMarks,
  candidates,
  // colors,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  const isGivenValue = given !== 0;
  const isInsertedValue = inserted !== 0;

  return (
    <button
      className={clsx('cell', {
        'cell--is-selected': isSelected,
      })}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      type='button'
    >
      {isGivenValue && (
        <span className='cell__value cell__value--dark'>
          {given}
        </span>
      )}

      {isInsertedValue && (
        <span className='cell__value'>
          {inserted}
        </span>
      )}

      {!isInsertedValue && pencilMarks?.map((pencilMark, index) => (
        <span
          className='cell__value cell__value--corner'
          key={index}
        >
          {pencilMark}
        </span>
      ))}

      {!isInsertedValue && candidates && candidates.length > 0 && (
        <span className='cell__value cell__value--center'>
          {candidates.join('')}
        </span>
      )}
    </button>
  );
};
