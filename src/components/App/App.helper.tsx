import type { Sudoku } from 'sudoku-gen/dist/types/sudoku.type';
import type { PuzzleData, PuzzleFlatTable, PuzzleValueType } from '@store';

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

const getCellRelevantValueType = (index: number, puzzleSetup: PuzzleFlatTable, puzzleMove: PuzzleData): PuzzleValueType | null => {
  return puzzleMove.values[index] !== 0 || puzzleSetup[index] !== 0
    ? 'normal'
    : puzzleMove.candidates[index].length > 0
      ? 'candidate'
      : puzzleMove.pencilMarks[index].length > 0
        ? 'pencil'
        : puzzleMove.colors[index].length > 0
          ? 'color'
          : null;
};

export const getMatchingCells = (index: number, puzzleSetup: PuzzleFlatTable, puzzleMove: PuzzleData) => {
  const valueType = getCellRelevantValueType(index, puzzleSetup, puzzleMove);
  const matchingCells: number[] = [];
  
  if (!valueType) {
    return [];
  }

  switch (valueType) {
    case 'normal': {
      const targetCell = puzzleSetup[index] || puzzleMove.values[index];

      for (let i = 0; i < puzzleMove.values.length; i++) {
        if (puzzleMove.values[i] === targetCell || puzzleSetup[i] === targetCell) {
          matchingCells.push(i);
        }
      }

      break;
    }
    case 'candidate': {
      const targetCell = puzzleMove.candidates[index];
      
      for (let i = 0; i < puzzleMove.candidates.length; i++) {
        // @NOTE: skip cells that already contain a normal value
        if (puzzleSetup[i] !== 0 || puzzleMove.values[i] !== 0) {
          continue;
        }
        
        // @NOTE: check if all digits in the target cell are present in the candidate cell
        if (targetCell.every(digit => puzzleMove.candidates[i].includes(digit)) ) {
          matchingCells.push(i);
        }
      }

      break;
    }
    case 'pencil': {
      const targetCell = puzzleMove.pencilMarks[index];

      for (let i = 0; i < puzzleMove.pencilMarks.length; i++) {
        // @NOTE: skip cells that already contain a normal value
        if (puzzleSetup[i] !== 0 || puzzleMove.values[i] !== 0) {
          continue;
        }
        
        // @NOTE: check if the target cell has any digits in common with the pencil mark cell
        if (targetCell.some(digit => puzzleMove.pencilMarks[i].includes(digit))) {
          matchingCells.push(i);
        }
      }

      break;
    }
    case 'color': {
      const targetCell = puzzleMove.colors[index];
      
      for (let i = 0; i < puzzleMove.colors.length; i++) {
        // @NOTE: check if the target cell has any colors in common with the color cell
        if (targetCell.some(digit => puzzleMove.colors[i].includes(digit))) {
          matchingCells.push(i);
        }
      }

      break;
    }
    default:
      return [];
  }

  return matchingCells;
};
