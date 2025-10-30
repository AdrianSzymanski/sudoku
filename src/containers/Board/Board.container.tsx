import { useState } from 'react';
import { Grid, Cell } from '../../components';
import { getFormattedCells } from './Board.helper';

export const Board: React.FC = () => {
  // @TODO: generate proper puzzle
  const data = {
    difficulty: 'easy',
    puzzle: [
      ['1', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '2', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '3', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '4', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '5', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '6', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '7', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '8', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '9'],
    ],
    solution: [
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
      ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
    ],
  };
  const cells = getFormattedCells(data);
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);

  const handleCellClick = (index: number) => {
    setSelectedCellIndex(index);
  };

  // @TODO: add proper double click logic
  const handleCellDoubleClick = (index: number) => {
    console.log('double clicked', index);
  };

  return (
    <Grid>
      {cells.given.map((_, i) => (
        <Cell
          given={cells.given[i]}
          inserted={cells.inserted[i]}
          pencilMarks={cells.pencilMarks[i]}
          candidates={cells.candidates[i]}
          colors={cells.colors[i]}
          isSelected={selectedCellIndex === i}
          onClick={() => handleCellClick(i)}
          onDoubleClick={() => handleCellDoubleClick(i)}
          key={i}
        />
      ))}
    </Grid>
  );
};
