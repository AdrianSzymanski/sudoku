import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, StoreActions, PuzzleFlatTable, PuzzleNestedTable } from './store.types';

// @TODO: do not persist the entire store

const initialState: StoreState = {
  puzzle: {
    given: Array(81).fill(0) as PuzzleFlatTable,
    inserted: Array(81).fill(0) as PuzzleFlatTable,
    pencilMarks: Array(81).fill([]) as PuzzleNestedTable,
    candidates: Array(81).fill([]) as PuzzleNestedTable,
    colors: Array(81).fill([]) as PuzzleNestedTable,
  },
  puzzleHistory: [],
  puzzleFuture: [],
  solution: Array(81).fill(0) as PuzzleFlatTable,
  selectedCells: [],
  selectionMode: 'single',
  inputMode: 'normal',
};

export const useStore = create(devtools(persist(immer(combine<StoreState, StoreActions>(
  initialState,
  (set) => ({
    // @NOTE: cell selection
    selectCell: (index) => set(state => ({
      selectedCells: [...state.selectedCells, index]
    })),
    deselectCell: (index) => set(state => ({
      selectedCells: state.selectedCells.filter(cell => cell !== index)
    })),
    clearSelectedCells: () => set({
      selectedCells: [],
    }),
    setSelectionMode: (mode) => set({
      selectionMode: mode,
    }),

    // @NOTE: cell input
    setInputMode: (mode) => set({
      inputMode: mode,
    }),

    // @NOTE: history management
    undo: () => set(state => ({
      puzzle: state.puzzleHistory[state.puzzleHistory.length],
      puzzleHistory: state.puzzleHistory.slice(0, -1),
      puzzleFuture: [state.puzzle, ...state.puzzleFuture],
    })),
    redo: () => set(state => ({
      puzzle: state.puzzleFuture[0],
      puzzleHistory: [...state.puzzleHistory, state.puzzle],
      puzzleFuture: state.puzzleFuture.slice(1),
    })),

    // @NOTE: other
    setNewPuzzle: (puzzle, solution, difficulty) => set({
      puzzle,
      puzzleHistory: [],
      puzzleFuture: [],
      solution,
      difficulty,
    }),
  }),
)), { name: 'store' })));
