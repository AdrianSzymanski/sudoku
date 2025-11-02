import { useStore, type PuzzleData } from '@store';
import { Grid, Cell } from '@ui';
import { getFormattedCells } from './Board.helper';

type BoardProps = {
  selectedCells: number[];
  currentMove: PuzzleData;
  onCellClick: (index: number) => void;
  onCellDoubleClick: (index: number) => void;
};

export const Board: React.FC<BoardProps> = ({
  selectedCells,
  currentMove,
  onCellClick,
  onCellDoubleClick,
}) => {
  const puzzleSetup = useStore(state => state.puzzleSetup);
  const cells = getFormattedCells(puzzleSetup, currentMove);

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
