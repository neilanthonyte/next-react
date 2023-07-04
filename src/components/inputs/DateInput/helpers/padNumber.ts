/* Adds a '0' in front of number below 10 to keep formatting consistent */
export const padNumber = (n: number) => (n < 10 ? "0" : "") + n;
