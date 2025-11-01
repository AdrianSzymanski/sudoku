import { useLayoutEffect } from 'react';
import { Grid, Cell } from '@ui';
import { useStore } from '@store';

// @TODO: memoize the Cell component?

export const Board: React.FC = () => {
  const { puzzle } = useStore();
  const selectedCells = useStore(state => state.selectedCells);
  const selectionMode = useStore(state => state.selectionMode);
  const selectCell = useStore(state => state.selectCell);
  const clearSelectedCells = useStore(state => state.clearSelectedCells);
  const setSelectionMode = useStore(state => state.setSelectionMode);

  const handleCellClick = (index: number) => {
    if (selectionMode === 'single') {
      clearSelectedCells();
    }
    selectCell(index);
  };

  const handleCellDoubleClick = (index: number) => {
    // @TODO: implement cell double click handling
    console.log('double clicked', index);
  };

  useLayoutEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setSelectionMode('multiple');
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setSelectionMode('single');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setSelectionMode]);

  return (
    <Grid>
      {puzzle.given.map((_, i) => (
        <Cell
          given={puzzle.given[i]}
          inserted={puzzle.inserted[i]}
          pencilMarks={puzzle.pencilMarks[i]}
          candidates={puzzle.candidates[i]}
          colors={puzzle.colors[i]}
          isSelected={selectedCells.includes(i)}
          onClick={() => handleCellClick(i)}
          onDoubleClick={() => handleCellDoubleClick(i)}
          key={i}
        />
      ))}
    </Grid>
  );
};
