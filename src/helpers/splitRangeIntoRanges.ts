// TODO: test

/*
this function takes a numerical range [start, end] and a max size
and creates an array of ranges, with the specified maximum size
Ranges are inclusive
eg:
{ 1-5 } (5) => [ {1-5} ]
{ 1-5 } (2) => [ {1-2}, {3-4}, {5-5} ]
 */

export type IRange = {
  start: number;
  end: number;
};

export function splitRangeIntoRanges(
  originalRange: IRange,
  maxSize: number,
): IRange[] {
  // short circuit if range is already with size
  if (originalRange.end - originalRange.start <= maxSize) {
    return [originalRange];
  }

  // input range it too large, chunk
  const splitRanges: IRange[] = [];

  let start = originalRange.start;
  let end = start + maxSize - 1;

  while (end < originalRange.end) {
    // push a new split range
    splitRanges.push({
      start,
      end,
    });

    // move start & end forward another maxSize
    start = start + maxSize;
    end = end + maxSize;
  }

  // create a chunk for any remainder time
  if (start <= originalRange.end) {
    splitRanges.push({
      start,
      end: originalRange.end,
    });
  }

  return splitRanges;
}
