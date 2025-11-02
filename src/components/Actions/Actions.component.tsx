import { getSudoku } from 'sudoku-gen';
import { useStore } from '@store';
import { Button } from '@ui';
import { getFormattedPuzzleData } from './Actions.helper';

// @TODO: after removing selectedCells from the store,
// the Actions component has to receive the selected cells as a prop
// and pass it to makeMove action

export const Actions: React.FC = () => {
  const setNewPuzzle = useStore(state => state.setNewPuzzle);

  const handleStartNewPuzzle = () => {
    const data = getSudoku('expert');
    const newPuzzleData = getFormattedPuzzleData(data);
    setNewPuzzle(newPuzzleData.puzzle, newPuzzleData.solution, newPuzzleData.difficulty);
  };

  const handleUndo = () => {
    console.log('undo');
  };

  const handleRedo = () => {
    console.log('redo');
  };

  return (
    <>
      <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '16px' }}>
        <Button onClick={handleStartNewPuzzle}>New</Button>
        <Button onClick={handleUndo}>Undo</Button>
        <Button onClick={handleRedo}>Redo</Button>
      </div>
    </>
  );
};
