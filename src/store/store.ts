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
            state.puzzleCurrentMove.values[index] = value;
          }
          break;
        case 'pencil':
          for (const index of selectedCells) {
            state.puzzleCurrentMove.pencilMarks[index].push(value);
          }
          break;
        case 'candidate':
          for (const index of selectedCells) {
            state.puzzleCurrentMove.candidates[index].push(value);
          }
          break;
        case 'color':
          for (const index of selectedCells) {
            state.puzzleCurrentMove.colors[index].push(value);
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
