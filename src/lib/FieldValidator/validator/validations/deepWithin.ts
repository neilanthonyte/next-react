import * as _ from "lodash";

export const deepWithin = (value: any, options: any) => {
  let isWithin = false;
  (options.options || []).map((o: any) => {
    isWithin = isWithin || _.isEqual(o, value);
  });
  if (!isWithin) {
    return options.message || "^The chosen option is not valid";
  }
};
