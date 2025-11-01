import type { Digit, Tuple } from '../types';

export type PuzzleFlatTable = Tuple<Digit, 81>;
export type PuzzleNestedTable = Tuple<Digit[], 81>;
type PuzzleDifficulty = 'easy' | 'medium' | 'hard' | 'expert'; // @TODO: use type from sudoku-gen
type PuzzleSelectionMode = 'single' | 'multiple';
type PuzzleInputMode = 'normal' | 'pencil' | 'candidates' | 'colors';

type PuzzleData = {
  given: PuzzleFlatTable;
  inserted: PuzzleFlatTable;
  pencilMarks: PuzzleNestedTable;
  candidates: PuzzleNestedTable;
  colors: PuzzleNestedTable;
};

export type StoreState = {
  puzzle: PuzzleData;
  puzzleHistory: PuzzleData[];
  puzzleFuture: PuzzleData[];
  solution: PuzzleFlatTable;
  difficulty?: PuzzleDifficulty;
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
  setNewPuzzle: (puzzle: PuzzleData, solution: PuzzleFlatTable, difficulty: PuzzleDifficulty) => void;
  undo: () => void;
  redo: () => void;
};
