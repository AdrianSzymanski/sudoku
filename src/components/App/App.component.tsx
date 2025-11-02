import { useLayoutEffect, useState } from 'react';
import { useStore } from '@store';
import { Layout } from '@ui';
import { Actions } from '../Actions';
import { Board } from '../Board';

export const App = () => {
  const puzzleHistory = useStore(state => state.puzzleHistory);
  const [moveIndex, setMoveIndex] = useState<number>(puzzleHistory.length - 1);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState<'single' | 'multiple'>('single');
  const currentMove = puzzleHistory[moveIndex];

  const handleCellClick = (index: number) => {
    if (selectionMode === 'single') {
      setSelectedCells([]);
    }
    setSelectedCells(prev => [...prev, index]);
  };

  const handleCellDoubleClick = (index: number) => {
    // @TODO: implement cell double click handling
    console.log('double clicked', index);
  };

  const handleUndo = () => {
    setMoveIndex(prev => prev - 1);
  };

  const handleRedo = () => {
    setMoveIndex(prev => prev + 1);
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
    <Layout
      main={(
        <Board
          selectedCells={selectedCells}
          currentMove={currentMove}
          onCellClick={handleCellClick}
          onCellDoubleClick={handleCellDoubleClick}
        />
      )}
      side={(
        <Actions
          selectedCells={selectedCells}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      )}
    />
  );
};
