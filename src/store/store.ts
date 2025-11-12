import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { current } from 'immer';
import type { StoreState, StoreActions, PuzzleFlatTable, PuzzleNestedTable } from './store.types';

const initialState: StoreState = {
  puzzleSetup: Array(81).fill(0) as PuzzleFlatTable,
  puzzleSolution: Array(81).fill(0) as PuzzleFlatTable,
  puzzleCurrentMove: {
    values: Array(81).fill(0) as PuzzleFlatTable,
    pencilMarks: Array(81).fill([]) as PuzzleNestedTable,
    candidates: Array(81).fill([]) as PuzzleNestedTable,
    colors: Array(81).fill([]) as PuzzleNestedTable,
  },
  puzzlePastMoves: [],
  puzzleFutureMoves: [],
};

export const useStore = create(devtools(persist(immer(combine<StoreState, StoreActions>(
  initialState,
  (set) => ({
    makeMove: (selectedCells, valueType, value) => set(state => {
      if (selectedCells.length === 0) {
        return state;
      }

      const currentMoveSnapshot = current(state.puzzleCurrentMove);
      state.puzzlePastMoves.push(currentMoveSnapshot);
      state.puzzleFutureMoves = [];

      switch (valueType) {
        case 'normal':
          for (const index of selectedCells) {
            let currentValue = state.puzzleCurrentMove.values[index];

            if (currentValue === value) {
              currentValue = 0;
            } else {
              currentValue = value;
            }

            state.puzzleCurrentMove.values[index] = currentValue;
          }
          break;
        case 'candidate':
          for (const index of selectedCells) {
            const candidates = state.puzzleCurrentMove.candidates[index];

            if (value === 0) {
              candidates.splice(0, candidates.length);
            } else if (candidates.includes(value)) {
              candidates.splice(candidates.indexOf(value), 1);
            } else {
              candidates.push(value);
            }

            candidates.sort();
          }
          break;
        case 'pencil':
          for (const index of selectedCells) {
            const pencilMarks = state.puzzleCurrentMove.pencilMarks[index];

            if (value === 0) {
              pencilMarks.splice(0, pencilMarks.length);
            } else if (pencilMarks.includes(value)) {
              pencilMarks.splice(pencilMarks.indexOf(value), 1);
            } else {
              pencilMarks.push(value);
            }

            pencilMarks.sort();
          }
          break;
        case 'color':
          for (const index of selectedCells) {
            const colors = state.puzzleCurrentMove.colors[index];

            if (value === 0) {
              colors.splice(0, colors.length);
            } else if (colors.includes(value)) {
              colors.splice(colors.indexOf(value), 1);
            } else {
              colors.push(value);
            }

            colors.sort();
          }
          break;
      }

      return state;
    }),
    undoMove: () => set(state => {
      if (state.puzzlePastMoves.length === 0) {
        return state;
      }

      const currentMoveSnapshot = current(state.puzzleCurrentMove);
      state.puzzleCurrentMove = state.puzzlePastMoves.pop()!;
      state.puzzleFutureMoves.unshift(currentMoveSnapshot);

      return state;
    }),
    redoMove: () => set(state => {
      if (state.puzzleFutureMoves.length === 0) {
        return state;
      }

      const currentMoveSnapshot = current(state.puzzleCurrentMove);
      state.puzzleCurrentMove = state.puzzleFutureMoves.shift()!;
      state.puzzlePastMoves.push(currentMoveSnapshot);

      return state;
    }),
    resetPuzzle: () => set(state => {
      state.puzzleCurrentMove = initialState.puzzleCurrentMove;
      state.puzzlePastMoves = initialState.puzzlePastMoves;
      state.puzzleFutureMoves = initialState.puzzleFutureMoves;

      return state;
    }),
    setNewPuzzle: (puzzle, solution, difficulty) => set(state => {
      state.puzzleSetup = puzzle;
      state.puzzleSolution = solution;
      state.puzzleDifficulty = difficulty;
      state.puzzleCurrentMove = initialState.puzzleCurrentMove;
      state.puzzlePastMoves = initialState.puzzlePastMoves;
      state.puzzleFutureMoves = initialState.puzzleFutureMoves;

      return state;
    }),
  }),
)), { name: 'store' })));
