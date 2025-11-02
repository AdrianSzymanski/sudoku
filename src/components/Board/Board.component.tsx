import { useStore } from '@store';
import { Grid, Cell } from '@ui';
import { getFormattedCells } from './Board.helper';

type BoardProps = {
  selectedCells: number[];
  onCellClick: (index: number) => void;
  onCellDoubleClick: (index: number) => void;
};

export const Board: React.FC<BoardProps> = ({
  selectedCells,
  onCellClick,
  onCellDoubleClick,
}) => {
  const puzzleSetup = useStore(state => state.puzzleSetup);
  const puzzleCurrentMove = useStore(state => state.puzzleCurrentMove);
  const cells = getFormattedCells(puzzleSetup, puzzleCurrentMove);

  return (
    <Grid>
      {/* @TODO: memoize Cell component? */}
      {cells.map((cell, i) => (
        <Cell
          value={cell.value}
          pencilMarks={cell.pencilMarks}
          candidates={cell.candidates}
          colors={cell.colors}
          isInitial={cell.isInitialValue}
          isSelected={selectedCells.includes(i)}
          onClick={() => onCellClick(i)}
          onDoubleClick={() => onCellDoubleClick(i)}
          key={i}
        />
      ))}
    </Grid>
  );
};
