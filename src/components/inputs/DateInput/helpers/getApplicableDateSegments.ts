/*
 * Determines which part of a datestamp we are collecting.
 */
export const getApplicableDateSegments = (
  dateFormat: string,
): { day: boolean; month: boolean; year: boolean } => {
  const parts = dateFormat.match(/^(YYYY)?-?(MM)?-?(DD)?$/i);

  if (!parts) {
    throw new Error("invalid date format");
  }

  return {
    day: !!parts[3],
    month: !!parts[2],
    year: !!parts[1],
  };
};
