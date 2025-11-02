import { getSudoku } from 'sudoku-gen';
import { useStore } from '@store';
import { Button } from '@ui';
import { getFormattedPuzzleData } from './Actions.helper';

type ActionsProps = {
  selectedCells: number[];
};

export const Actions: React.FC<ActionsProps> = ({
  selectedCells,
}) => {
  const setNewPuzzle = useStore(state => state.setNewPuzzle);
  const makeMove = useStore(state => state.makeMove);
  const undoMove = useStore(state => state.undoMove);
  const redoMove = useStore(state => state.redoMove);

  const handleStartNewPuzzle = () => {
    const data = getSudoku('expert');
    const newPuzzleData = getFormattedPuzzleData(data);
    setNewPuzzle(newPuzzleData.puzzle, newPuzzleData.solution, newPuzzleData.difficulty);
  };

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px' }}>
        <Button onClick={handleStartNewPuzzle}>New</Button>
        <Button onClick={undoMove}>Undo</Button>
        <Button onClick={redoMove}>Redo</Button>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px' }}>
        {/* @TODO: only call makeMove when there is data difference */}
        <Button onClick={() => makeMove(selectedCells, 'normal', 1)}>1</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 2)}>2</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 3)}>3</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 4)}>4</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 5)}>5</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 6)}>6</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 7)}>7</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 8)}>8</Button>
        <Button onClick={() => makeMove(selectedCells, 'normal', 9)}>9</Button>
      </div>
    </>
  );
};
