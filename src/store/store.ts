import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StoreState, StoreActions, PuzzleFlatTable, PuzzleNestedTable } from './store.types';

const initialState: StoreState = {
  puzzleSetup: Array(81).fill(0) as PuzzleFlatTable,
  puzzleSolution: Array(81).fill(0) as PuzzleFlatTable,
  puzzleHistory: [{
    values: Array(81).fill(0) as PuzzleFlatTable,
    pencilMarks: Array(81).fill([]) as PuzzleNestedTable,
    candidates: Array(81).fill([]) as PuzzleNestedTable,
    colors: Array(81).fill([]) as PuzzleNestedTable,
  }],
};

export const useStore = create(devtools(persist(immer(combine<StoreState, StoreActions>(
  initialState,
  (set) => ({
    makeMove: (selectedCells, valueType, value) => set(state => {
      if (selectedCells.length === 0) {
        return state;
      }

      let newMove = state.puzzleHistory[state.puzzleHistory.length - 1];

      switch (valueType) {
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
    setNewPuzzle: (puzzle, solution, difficulty) => set(state => {
      state.puzzleSetup = puzzle;
      state.puzzleSolution = solution;
      state.puzzleDifficulty = difficulty;
      state.puzzleHistory = initialState.puzzleHistory;
      
      return state;
    }),
  }),
)), { name: 'store' })));
