import type { Digit, Tuple } from '../types';

export type PuzzleFlatTable = Tuple<Digit, 81>;
export type PuzzleNestedTable = Tuple<Digit[], 81>;
type PuzzleDifficulty = 'easy' | 'medium' | 'hard' | 'expert'; // @TODO: use type from sudoku-gen
export type PuzzleValueType = 'normal' | 'pencil' | 'candidate' | 'color';

export type PuzzleData = {
  values: PuzzleFlatTable;
  pencilMarks: PuzzleNestedTable;
  candidates: PuzzleNestedTable;
  colors: PuzzleNestedTable;
};

export type StoreState = {
  puzzleSetup: PuzzleFlatTable;
  puzzleSolution: PuzzleFlatTable;
  puzzleDifficulty?: PuzzleDifficulty;
  puzzleCurrentMove: PuzzleData;
  puzzlePastMoves: PuzzleData[];
  puzzleFutureMoves: PuzzleData[];
};

export type StoreActions = {
  makeMove: (selectedCells: number[], valueType: PuzzleValueType, value: Digit) => void;
  undoMove: () => void;
  redoMove: () => void;
  resetPuzzle: () => void;
  setNewPuzzle: (puzzle: PuzzleFlatTable, solution: PuzzleFlatTable, difficulty: PuzzleDifficulty) => void;
};
