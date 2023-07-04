/* Turns an objects keys into camel case i.e form_type -> formType */

export const camelizeObjKeys = (obj: any): any => {
  const camelizedObject: any = {};
  Object.keys(obj).forEach((key: string) => {
    camelizedObject[camelizeString(key)] = obj[key];
  });

  return camelizedObject;
};

export const camelizeString = (str: string): string => {
  const splitKey = str.split("_");

  const uppercaseKeys = splitKey.map((segment: string, index: number) => {
    if (index !== 0) {
      return segment.charAt(0).toUpperCase() + segment.slice(1);
    }

    return segment;
  });

  return uppercaseKeys.join("");
};
