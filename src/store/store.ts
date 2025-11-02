import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, StoreActions, PuzzleFlatTable, PuzzleNestedTable } from './store.types';

// @TODO: do not persist the entire store

const initialState: StoreState = {
  puzzleSetup: Array(81).fill(0) as PuzzleFlatTable,
  puzzleSolution: Array(81).fill(0) as PuzzleFlatTable,
  puzzleHistory: [{
    values: Array(81).fill(0) as PuzzleFlatTable,
    pencilMarks: Array(81).fill([]) as PuzzleNestedTable,
    candidates: Array(81).fill([]) as PuzzleNestedTable,
    colors: Array(81).fill([]) as PuzzleNestedTable,
  }],
  selectedCells: [],
  selectionMode: 'single',
  inputMode: 'normal',
};

export const useStore = create(devtools(persist(immer(combine<StoreState, StoreActions>(
  initialState,
  (set) => ({
    // @NOTE: cell selection
    selectCell: (index) => set(state => {
      state.selectedCells.push(index);
      return state;
    }),
    deselectCell: (index) => set(state => {
      state.selectedCells = state.selectedCells.filter(cell => cell !== index);
      return state;
    }),
    clearSelectedCells: () => set(state => {
      state.selectedCells = [];
      return state;
    }),
    setSelectionMode: (mode) => set(state => {
      state.selectionMode = mode;
      return state;
    }),

    // @NOTE: cell input
    setInputMode: (mode) => set(state => {
      state.inputMode = mode;
      return state;
    }),
    makeMove: (value) => set(state => {
      const selectedCells = state.selectedCells;
      const inputMode = state.inputMode;

      if (selectedCells.length === 0) {
        return state;
      }

      let newMove = state.puzzleHistory[state.puzzleHistory.length - 1];

      switch (inputMode) {
        case 'normal':
          for (const index of selectedCells) {
            newMove.values[index] = value;
          }
          break;
        case 'pencil':
          for (const index of selectedCells) {
            newMove.pencilMarks[index].push(value);
          }
          break;
        case 'candidates':
          for (const index of selectedCells) {
            newMove.candidates[index].push(value);
          }
          break;
        case 'colors':
          for (const index of selectedCells) {
            newMove.colors[index].push(value);
          }
          break;
      }

      state.puzzleHistory.push(newMove);

      return state;
    }),

    // @NOTE: other
    setNewPuzzle: (puzzle, solution, difficulty) => set(state => {
      state.puzzleSetup = puzzle;
      state.puzzleSolution = solution;
      state.puzzleDifficulty = difficulty;
      state.puzzleHistory = initialState.puzzleHistory;
      state.selectedCells = initialState.selectedCells;
      
      return state;
    }),
  }),
)), { name: 'store' })));
