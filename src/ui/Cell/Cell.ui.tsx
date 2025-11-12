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

export const Cell: React.FC<CellProps> = ({
  value,
  pencilMarks,
  candidates,
  colors,
  isInitial = false,
  isSelected = false,
  onClick,
  onDoubleClick,
}) => {
  const isValue = value !== 0;
  // @TODO: implement background in SVG to avoid rasterization issues
  const conicGradientRanges = colors.reduce((acc, colorIndex, i) => {
    const step = Math.round(100 / colors.length);
    let range = `var(--color-tile-${colorIndex}) ${i * step}%, var(--color-tile-${colorIndex}) ${i * step + step - 0.25}%`;
    return acc ? `${acc}, ${range}` : range;
  }, '');

  return (
    <button
      className={clsx('cell', {
        'cell--is-selected': isSelected,
      })}
      {...(conicGradientRanges && { style: { background: `conic-gradient(from 20deg, ${conicGradientRanges})` } })}
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
