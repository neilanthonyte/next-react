/**
 * Computes the sum of an array of numbers.
 */
export const arraySum = (array: number[]) => array.reduce((a, b) => a + b);

/**
 * Computes the arithmetic average of an array of numbers.
 */
export const arrayAverage = (array: number[]) => arraySum(array) / array.length;

/**
 * Computes the union of two arrays.
 */
const arrayUnionSimple = (a: any[], b: any[]) => [...a, ...b];

/**
 * Computes the union of any number of given arrays.
 */
export const arrayUnion = (...args: any[][]) => args.reduce(arrayUnionSimple);

/**
 * Computes the intersection of two arrays.
 */
const arrayIntersectionSimple = (a: any[], b: any[]) =>
  a.filter((element) => b.includes(element));

/**
 * Computes the intersection of any number of given arrays.
 */
export const arrayIntersection = (...args: any[][]) =>
  args.reduce(arrayIntersectionSimple);
