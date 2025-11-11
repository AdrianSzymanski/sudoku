import { useStore } from '@store';
import { Grid, Cell, Spacer, Button } from '@ui';
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
  const {
    puzzleSetup,
    puzzleCurrentMove,
    puzzlePastMoves,
    puzzleFutureMoves,
    undoMove,
    redoMove,
    resetPuzzle,
  } = useStore(state => state);
  const cells = getFormattedCells(puzzleSetup, puzzleCurrentMove);

  return (
    <Spacer stack='column' align='end'>
      <Spacer>
        <Button
          isDisabled={puzzlePastMoves.length === 0}
          isFullWidth={true}
          onClick={undoMove}
        >
          Undo
        </Button>
        <Button
          isDisabled={puzzleFutureMoves.length === 0}
          isFullWidth={true}
          onClick={redoMove}
        >
          Redo
        </Button>
        <Button
          isDisabled={puzzlePastMoves.length === 0 && puzzleFutureMoves.length === 0}
          isFullWidth={true}
          onClick={resetPuzzle}
        >
          Reset
        </Button>
      </Spacer>
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
    </Spacer>
  );
};
