import { getSudoku } from 'sudoku-gen';
import { useStore } from '@store';
import { Button } from '@ui';
import { getFormattedPuzzleData } from './Actions.helper';

export const Actions: React.FC = () => {
  const setNewPuzzle = useStore(state => state.setNewPuzzle);
  const undo = useStore(state => state.undo);
  const redo = useStore(state => state.redo);

  const handleNewPuzzleClick = () => {
    const data = getSudoku('easy');
    const newPuzzleData = getFormattedPuzzleData(data);
    setNewPuzzle(newPuzzleData.puzzle, newPuzzleData.solution, newPuzzleData.difficulty);
  };

  return (
    <div>
      <Button onClick={handleNewPuzzleClick}>New Puzzle</Button>
      <Button onClick={undo}>Undo</Button>
      <Button onClick={redo}>Redo</Button>
    </div>
  );
};
