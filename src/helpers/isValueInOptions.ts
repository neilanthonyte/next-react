import * as _ from "lodash";
import { StdOptions } from "./standardizeOptions";

// Used to ensure unknown values are not passed and modified by an options input
export function isValueInOptions<T>(options: StdOptions<T>, value: T | T[]) {
  const optionsArray = Array.isArray(options) ? options : [options];
  let valueArray = Array.isArray(value) ? value : [value];
  valueArray = valueArray.filter(
    (x) => (typeof x !== "string" || x !== "") && x !== undefined && x !== null,
  );
  const optionValueArray = optionsArray.map((option) => option.value);
  return _.difference(valueArray, optionValueArray).length === 0;
}
