// TODO - add types

export const valueIsNotEmptyBasedOnField = (value: any, field: any) => {
  return field.allowMultiple
    ? value !== null && value.length > 0
    : typeof value === "string"
    ? value.length > 0
    : value !== null;
};
