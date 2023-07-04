/**
 * Maps a filter string (e.g. a=b|c=d) to an object representation.
 *
 * @param filterStr
 * @returns {{name: (*|string), value: (*|string)}[]}
 */
export const filterStrToObj = (filterStr: string) => {
  return filterStr.split(/\|/g).map((x) => {
    const details = x.split(/=/);
    return {
      name: details[0],
      value: details[1],
    };
  });
};
