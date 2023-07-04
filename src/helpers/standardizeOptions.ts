import * as _ from "lodash";

export interface IOption<T> {
  label: string;
  value: T;
  icon?: string;
}

export type StdOptions<T> = IOption<T>[]; // [{label:'foo',value:'foo'},{label:'bar',value:'bar'}]
export type KeyedOptions<T> = { [key: string]: T }; // {foo:'foo', bar:'bar'}
export type ArrayOptions<T> = T[]; // ['foo','bar']

export type Options<T> = ArrayOptions<T> | StdOptions<T> | KeyedOptions<T>;

/**
 * Converts the different options formats into the verbose format:
 *
 * In:
 * ['foo','bar']
 * {foo:'foo', bar:'bar'}
 * [{label:'foo',value:'foo'},{label:'bar',value:'bar'}]
 *
 * Out:
 * [{label:'foo',value:'foo'},{label:'bar',value:'bar'}]
 */
export const standardizeOptions = function <T>(
  options: Options<T>,
  autoOrder = false,
): StdOptions<T> {
  const standardisedOptions = convertOptionsToStandardOptions(options);

  if (autoOrder) {
    return _.sortBy(standardisedOptions, (n) => n.value);
  }

  return standardisedOptions;
};

function convertOptionsToStandardOptions<T>(
  options: Options<T>,
): StdOptions<T> {
  // Already in correct format. No need to format further
  if (isStdOptions(options)) {
    return [...options];
  }

  if (isArrayOptions(options)) {
    return options.map((value) => ({
      label: value.toString(),
      value,
    }));
  }

  if (isKeyedOptions(options)) {
    return Object.keys(options).map((key) => ({
      label: key,
      value: options[key],
    }));
  }

  console.error(options);
  throw new Error("Unrecogised format");
}

// [{label:'foo',value:'foo'},{label:'bar',value:'bar'}]
function isStdOptions<T>(options: Options<T>): options is StdOptions<T> {
  return (
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "object" &&
    options[0] !== null
  );
}

// ['foo','bar']
function isArrayOptions<T>(options: Options<T>): options is ArrayOptions<T> {
  return Array.isArray(options) && !isStdOptions(options);
}

// {foo:'foo', bar:'bar'}
function isKeyedOptions<T>(options: Options<T>): options is KeyedOptions<T> {
  return _.isObject(options);
}
