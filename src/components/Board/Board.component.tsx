import { useLayoutEffect } from 'react';
import { useStore } from '@store';
import { Grid, Cell } from '@ui';

// @TODO: memoize the Cell component?

export const Board: React.FC = () => {
  const puzzleData = useStore(state => state.puzzleData);
  const selectedCells = useStore(state => state.selectedCells);
  const selectionMode = useStore(state => state.selectionMode);
  const selectCell = useStore(state => state.selectCell);
  const clearSelectedCells = useStore(state => state.clearSelectedCells);
  const setSelectionMode = useStore(state => state.setSelectionMode);

  const handleCellClick = (index: number) => {
    // @TODO: refactor to make only one action
    if (selectionMode === 'single') {
      clearSelectedCells();
    }
    selectCell(index);
  };

  const handleCellDoubleClick = (index: number) => {
    // @TODO: implement cell double click handling
    console.log('double clicked', index);
  };

  // @TODO: refactor to not call the store actions on key presses.
  // Use local state and only store the selection mode triggered in Actions.tsx?
  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control' && selectionMode === 'single') {
        setSelectionMode('multiple');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control' && selectionMode === 'multiple') {
        setSelectionMode('single');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setSelectionMode, selectionMode]);

  return (
    <Grid>
      {puzzleData.given.map((_, i) => (
        <Cell
          given={puzzleData.given[i]}
          inserted={puzzleData.inserted[i]}
          pencilMarks={puzzleData.pencilMarks[i]}
          candidates={puzzleData.candidates[i]}
          colors={puzzleData.colors[i]}
          isSelected={selectedCells.includes(i)}
          onClick={() => handleCellClick(i)}
          onDoubleClick={() => handleCellDoubleClick(i)}
          key={i}
        />
      ))}
    </Grid>
  );
};
