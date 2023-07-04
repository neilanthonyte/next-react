import { splitRangeIntoRanges } from "next-shared/src/helpers/splitRangeIntoRanges";

describe("Testing splitRangeIntoRanges", () => {
  describe("Basic usage", () => {
    it("Returns entire range as single range if within maxSize", async () => {
      expect(splitRangeIntoRanges({ start: 0, end: 5 }, 5)).toEqual([
        { start: 0, end: 5 },
      ]);

      expect(splitRangeIntoRanges({ start: 15, end: 100 }, 100)).toEqual([
        { start: 15, end: 100 },
      ]);

      expect(splitRangeIntoRanges({ start: 1, end: 1 }, 1)).toEqual([
        { start: 1, end: 1 },
      ]);
    });

    it("Chunks range perfectly if divisible by maxSize", async () => {
      expect(splitRangeIntoRanges({ start: 1, end: 5 }, 1)).toEqual([
        { start: 1, end: 1 },
        { start: 2, end: 2 },
        { start: 3, end: 3 },
        { start: 4, end: 4 },
        { start: 5, end: 5 },
      ]);

      expect(splitRangeIntoRanges({ start: 1, end: 25 }, 5)).toEqual([
        { start: 1, end: 5 },
        { start: 6, end: 10 },
        { start: 11, end: 15 },
        { start: 16, end: 20 },
        { start: 21, end: 25 },
      ]);

      expect(splitRangeIntoRanges({ start: 1, end: 9 }, 3)).toEqual([
        { start: 1, end: 3 },
        { start: 4, end: 6 },
        { start: 7, end: 9 },
      ]);

      expect(splitRangeIntoRanges({ start: 0, end: 8 }, 3)).toEqual([
        { start: 0, end: 2 },
        { start: 3, end: 5 },
        { start: 6, end: 8 },
      ]);

      expect(splitRangeIntoRanges({ start: 1, end: 50 }, 10)).toEqual([
        { start: 1, end: 10 },
        { start: 11, end: 20 },
        { start: 21, end: 30 },
        { start: 31, end: 40 },
        { start: 41, end: 50 },
      ]);

      expect(splitRangeIntoRanges({ start: 1, end: 9 }, 3)).toEqual([
        { start: 1, end: 3 },
        { start: 4, end: 6 },
        { start: 7, end: 9 },
      ]);
    });

    it("Includes any overflow range if not divisible by maxSize", async () => {
      expect(splitRangeIntoRanges({ start: 0, end: 50 }, 9)).toEqual([
        { start: 0, end: 8 },
        { start: 9, end: 17 },
        { start: 18, end: 26 },
        { start: 27, end: 35 },
        { start: 36, end: 44 },
        { start: 45, end: 50 },
      ]);

      expect(splitRangeIntoRanges({ start: 0, end: 9 }, 3)).toEqual([
        { start: 0, end: 2 },
        { start: 3, end: 5 },
        { start: 6, end: 8 },
        { start: 9, end: 9 },
      ]);
    });
  });
});
