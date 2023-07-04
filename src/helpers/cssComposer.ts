import * as _ from "lodash";

const getKeyName = (baseName: string = "", key: string = "") =>
  baseName.length
    ? key.length
      ? key[0] === "-"
        ? key
        : `${baseName}_${key}`
      : baseName
    : key;

/*
 * Helper to build class names.
 * Accept either strings or objects with key as class name and value as boolean
 * If value is true, it adds the class name
 */
export const cssComposer =
  (styleBlock: { [key: string]: string } = {}, baseName = "") =>
  (
    ...args: Array<
      string | boolean | { [key: string]: boolean } | { ["className"]: string }
    >
  ) => {
    const classNames: string[] = [];

    _.each(args, (arg) => {
      if (typeof arg === "object") {
        _.each(arg, (val: boolean | string, key: string) => {
          if (key === "className" && typeof val === "string") {
            classNames.push(val);
          } else if (!!val) {
            classNames.push(styleBlock[key]);
          }
        });
      } else if (_.isString(arg)) {
        classNames.push(styleBlock[getKeyName(baseName, arg)]);
      } else if (!arg) {
        return;
      } else {
        throw new Error("Unexpected type in class name lookup.");
      }
    });
    return classNames.join(" ");
  };
