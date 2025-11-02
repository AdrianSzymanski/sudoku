import type { Digit, Tuple } from '../types';

export type PuzzleFlatTable = Tuple<Digit, 81>;
export type PuzzleNestedTable = Tuple<Digit[], 81>;
type PuzzleDifficulty = 'easy' | 'medium' | 'hard' | 'expert'; // @TODO: use type from sudoku-gen
type PuzzleSelectionMode = 'single' | 'multiple';
type PuzzleInputMode = 'normal' | 'pencil' | 'candidates' | 'colors';

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
  puzzleHistory: PuzzleData[];
  selectedCells: number[];
  selectionMode: PuzzleSelectionMode;
  inputMode: PuzzleInputMode;
};

export type StoreActions = {
  selectCell: (index: number) => void;
  deselectCell: (index: number) => void;
  clearSelectedCells: () => void;
  setSelectionMode: (mode: PuzzleSelectionMode) => void;
  setInputMode: (mode: PuzzleInputMode) => void;
  makeMove: (value: Digit) => void;
  setNewPuzzle: (puzzle: PuzzleFlatTable, solution: PuzzleFlatTable, difficulty: PuzzleDifficulty) => void;
};
