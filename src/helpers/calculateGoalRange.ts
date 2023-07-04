export interface IGoalRange {
  min: number;
  max: number;
  suggested: number;
}

export function calculateGoalRange(
  idealValue: number, // the value to try and push the user to
  rangePercent: number, // the percentage of 'lastReading' that makes up the range
  lastReadingWeighting: number, // how much the last reading affects the result
  lastReading: number,
): IGoalRange {
  const idealWeighting = 1 - lastReadingWeighting; // how much the ideal value affects the result

  const range = lastReading * rangePercent;
  const halfRange = range / 2;

  const minIdeal = idealValue - halfRange;
  const maxIdeal = idealValue + halfRange;

  const minLast = lastReading - halfRange;
  const maxLast = lastReading + halfRange;

  let min = minIdeal * idealWeighting + minLast * lastReadingWeighting;
  let max = maxIdeal * idealWeighting + maxLast * lastReadingWeighting;

  if (min > lastReading) {
    // adjust to hold min at last reading
    min = lastReading;
    max = lastReading + range;
  }

  if (max < lastReading) {
    // adjust to hold max at last reading
    min = lastReading - range;
    max = lastReading;
  }

  const suggested = (min + max) / 2;

  return { min, max, suggested };
}
