import clsx from 'clsx';
import './Cell.ui.css';

type CellProps = {
  value: number;
  pencilMarks: number[];
  candidates: number[];
  colors: number[];
  isInitial?: boolean;
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
};

// @TODO: add background colors support to the cell

export const Cell: React.FC<CellProps> = ({
  value,
  pencilMarks,
  candidates,
  // colors,
  isInitial = false,
  isSelected = false,
  onClick,
  onDoubleClick,
}) => {
  const isValue = value !== 0;

  return (
    <button
      className={clsx('cell', {
        'cell--is-selected': isSelected,
      })}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      type='button'
    >
      {!isInitial ? (
        <>
          {isValue && (
            <span className='cell__value'>
              {value}
            </span>
          )}

          {!isValue && pencilMarks.map((pencilMark, i) => (
            <span className='cell__value cell__value--corner' key={i}>
              {pencilMark}
            </span>
          ))}

          {!isValue && candidates.length > 0 && (
            <span className='cell__value cell__value--center'>
              {candidates.join('')}
            </span>
          )}
        </>
      ) : (
        <>
          {isValue && (
            <span className='cell__value cell__value--dark'>
              {value}
            </span>
          )}
        </>
      )}
    </button>
  );
};
