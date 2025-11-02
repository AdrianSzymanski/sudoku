import type { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import type { PuzzleFlatTable } from '@store';

export const getFormattedPuzzleData = (data: Sudoku) => {
  return {
    puzzle: data.puzzle
      .replaceAll('-', '0')
      .split('')
      .map((value: string) => parseInt(value, 10)) as PuzzleFlatTable,
    solution: data.solution
      .replaceAll('-', '0')
      .split('')
      .map((value: string) => parseInt(value, 10)) as PuzzleFlatTable,
    difficulty: data.difficulty,
  };
};
