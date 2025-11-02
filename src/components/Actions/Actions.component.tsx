import { getSudoku } from 'sudoku-gen';
import { useStore } from '@store';
import { Button } from '@ui';
import { getFormattedPuzzleData } from './Actions.helper';

// @TODO: after removing selectedCells from the store,
// the Actions component has to receive the selected cells as a prop
// and pass it to makeMove action

export const Actions: React.FC = () => {
  const setNewPuzzle = useStore(state => state.setNewPuzzle);
  const makeMove = useStore(state => state.makeMove);
  const undo = useStore(state => state.undo);
  const redo = useStore(state => state.redo);

  const handleStartNewPuzzle = () => {
    const data = getSudoku('expert');
    const newPuzzleData = getFormattedPuzzleData(data);
    setNewPuzzle(newPuzzleData.puzzle, newPuzzleData.solution, newPuzzleData.difficulty);
  };

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px' }}>
        <Button onClick={handleStartNewPuzzle}>New</Button>
        <Button onClick={undo}>Undo</Button>
        <Button onClick={redo}>Redo</Button>
      </div>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px' }}>
        <Button onClick={() => makeMove(1)}>1</Button>
        <Button onClick={() => makeMove(2)}>2</Button>
        <Button onClick={() => makeMove(3)}>3</Button>
        <Button onClick={() => makeMove(4)}>4</Button>
        <Button onClick={() => makeMove(5)}>5</Button>
        <Button onClick={() => makeMove(6)}>6</Button>
        <Button onClick={() => makeMove(7)}>7</Button>
        <Button onClick={() => makeMove(8)}>8</Button>
        <Button onClick={() => makeMove(9)}>9</Button>
      </div>
    </>
  );
};
