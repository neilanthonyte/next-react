/**
 * Create a path based on a current location and relative path.
 */
export const computePath = (base: string, relative: string) => {
  // allow for absolute.
  if (relative[0] === "/") {
    return relative.slice(1);
  }

  const paths = relative.split("/");
  let baseSplit = base.split(".");
  // base =

  // work out what we're adding to the end of the path
  const pathAdditions = paths.filter((v) => v !== "..");
  // work out how many segments from the base to remove
  const toRemove = paths.length - pathAdditions.length;

  if (toRemove > baseSplit.length) {
    throw new Error("Relative path goes back too far");
  }

  if (toRemove) {
    baseSplit = baseSplit.slice(0, -toRemove);
  }

  return baseSplit.concat(pathAdditions).join(".");
};
