import type { PuzzleData, PuzzleFlatTable } from '@store';

export const getFormattedCells = (puzzleSetup: PuzzleFlatTable, currentMove: PuzzleData) => {
  return puzzleSetup.map((value, i) => ({
    value: value || currentMove.values[i],
    pencilMarks: currentMove.pencilMarks[i],
    candidates: currentMove.candidates[i],
    colors: currentMove.colors[i],
    isInitialValue: Boolean(value),
  }));
};
