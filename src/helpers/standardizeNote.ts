import * as _ from "lodash";
import { isEmpty } from "./isEmpty";

export const standardizeNote = (formData: any): any => {
  if (
    Array.isArray(formData) &&
    formData.length > 0 &&
    typeof formData[0] === "string"
  ) {
    return formData.join(", ");
  }

  if (Array.isArray(formData)) {
    return formData.map((n) => standardizeNote(n));
  }

  if (formData === null) {
    // do nothing
  } else if (typeof formData === "object") {
    return Object.keys(formData)
      .filter((k) => k[0] !== "_")
      .map((key) => {
        const label = formData["_" + key] || _.startCase(key);
        return {
          key,
          label: label,
          value: formData[key],
        };
      })
      .filter(({ value }) => !isEmpty(value))
      .map(({ label, value }) => {
        return {
          label: label,
          value: standardizeNote(value),
        };
      });
  }

  return formData;
};
