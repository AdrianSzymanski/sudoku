type Data = {
  difficulty: string;
  puzzle: string[][];
  solution: string[][];
};

export const getFormattedCells = (data: Data) => {
  return {
    given: data.puzzle.flat().map((value: string) => parseInt(value, 10)),
    inserted: Array.from({ length: 81 }, () => 0),
    pencilMarks: Array.from({ length: 81 }, () => []) as number[][],
    candidates: Array.from({ length: 81 }, () => []) as number[][],
    colors: Array.from({ length: 81 }, () => []) as number[][],
  };
};
