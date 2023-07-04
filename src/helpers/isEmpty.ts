/**
 * Determines if a object is blank, keeping in mind how labels are represented..
 * @param {*} value
 */
export const isEmpty = (value: any): boolean => {
  if (
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return true;
  }

  // an object with only labels and empty values
  if (typeof value === "object") {
    return Object.keys(value)
      .filter((key) => !key.startsWith("_"))
      .map((key) => value[key])
      .every((subVal) => isEmpty(subVal));
  }

  return false;
};
