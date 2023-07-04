import * as _ from "lodash";

/**
 * Converts an object into a path/value array.
 */
const nextKey = (keySoFar: string, key: string, pathDelimiter = ".") =>
  `${keySoFar}${keySoFar ? pathDelimiter : ""}${key}`;

export const flattenForm = (
  source: Array<any> | { [key: string]: any } | undefined,
  preserveObjectFields: string[] = [],
  preserveObjectStructures: string[][] = [],
  flattened: any = {},
  keySoFar = "",
) => {
  if (source === undefined) {
    return;
  }

  const simpleArray =
    Array.isArray(source) &&
    source.filter((o) => typeof o === "object").length === 0;
  const exportChildren = typeof source === "object" && !simpleArray;

  if (exportChildren) {
    // iterate over keys in source object
    for (const k in source) {
      // TODO should check this
      const src: { [key: string]: any } = source as { [key: string]: any };
      const value = src[k];
      const key = nextKey(keySoFar, k);
      // escape certain fields based on name and/or value
      if (
        // check current field key is not in 'preserveObjectFields', or
        // structure of current field value does not conform to any items in
        // preserveObjectStructures.
        // if either of these are true, don't flatten the current value.
        preserveObjectFields.indexOf(k) > -1 ||
        preserveObjectStructures.some(
          (p) => _.difference(p, Object.keys(value || {})).length === 0,
        )
      ) {
        flattened[key] = value;
      } else {
        flattenForm(
          value,
          preserveObjectFields,
          preserveObjectStructures,
          flattened,
          key,
        );
      }
    }
  } else {
    flattened[keySoFar] = source;
  }
  return flattened;
};
