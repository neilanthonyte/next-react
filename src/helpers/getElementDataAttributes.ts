import * as _ from "lodash";

/**
 * Helper function returning an object with all data attributes for a given DOM Element
 * The object keys are formatted as React Components props
 * e.g. <div data-ehr-id="123" /> = { ehrId: "123" }
 */
export const getElementDataAttributes = (
  el: Element,
): Record<string, string> => {
  const attributes = el.attributes;
  const data: Record<string, string> = {};
  Array.from(attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) {
      const propName = _.camelCase(attr.name.replace("data-", ""));
      data[propName] = attr.textContent;
    }
  });
  return data;
};
