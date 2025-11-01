export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Tuple<T, N extends number, R extends unknown[] = []> =
  R['length'] extends N ? R : Tuple<T, N, [...R, T]>;
