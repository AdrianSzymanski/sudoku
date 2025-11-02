import { useLayoutEffect, useState } from 'react';
import { Layout } from '@ui';
import { Actions } from '../Actions';
import { Board } from '../Board';

export const App = () => {
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState<'single' | 'multiple'>('single');

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
          onCellClick={handleCellClick}
          onCellDoubleClick={handleCellDoubleClick}
        />
      )}
      side={(
        <Actions selectedCells={selectedCells} />
      )}
    />
  );
};
