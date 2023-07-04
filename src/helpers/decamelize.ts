/**
 * De-camelize a string. Take an optional separator string join parts with.
 */
export function decamelize(str: string, separator?: string): string {
  separator = typeof separator === "undefined" ? "_" : separator;
  return str
    .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
    .toLowerCase();
}

export const decamelizeObj = (obj: any, separator: string): any => {
  const deCamelizedObject: any = {};
  Object.keys(obj).forEach((key: string) => {
    const decamelizedKey = decamelize(key, separator);
    deCamelizedObject[decamelizedKey] = obj[key];
  });

  return deCamelizedObject;
};
