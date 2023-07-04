export const isPromise = (value: any): value is Promise<any> =>
  value &&
  !!value &&
  (typeof value === "object" || typeof value === "function") &&
  typeof value.then === "function";
