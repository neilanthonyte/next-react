import * as _ from "lodash";

/**
 * Convert from a string to a set of camera positions.
 */
const parseCameraString = (str: string) => {
  if (!_.isString(str) || str === "") {
    return null;
  }
  const vals = str.split(/,/g);
  return {
    position: {
      x: parseFloat(vals[0]),
      y: parseFloat(vals[1]),
      z: parseFloat(vals[2]),
    },
    target: {
      x: parseFloat(vals[3]),
      y: parseFloat(vals[4]),
      z: parseFloat(vals[5]),
    },
    up: {
      x: parseFloat(vals[6]),
      y: parseFloat(vals[7]),
      z: parseFloat(vals[8]),
    },
  };
};

export default parseCameraString;
