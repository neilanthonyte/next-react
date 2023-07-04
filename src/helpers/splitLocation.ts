/**
 * Splits a path at a given index.
 */
export const splitLocation = (pathname: string, level = 0) => {
  const parts = pathname.replace(/^\/|\/$/, "").split("/");
  return {
    base: [""].concat(parts.splice(0, level)).join("/") || "_root_",
    rest: [""].concat(parts).join("/"),
  };
};
