/**
 * get UTC time in seconds
 *
 * @returns {number}
 */
export function currentUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}
