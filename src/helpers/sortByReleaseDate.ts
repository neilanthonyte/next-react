export interface IReleasable {
  released: number | false;
}

/**
 * Used in an Array.sort function. Sort
 * an array of IReleasable by the released prop.
 */
export const sortByReleaseDate = (a: IReleasable, b: IReleasable) =>
  (a.released as number) - (b.released as number);
