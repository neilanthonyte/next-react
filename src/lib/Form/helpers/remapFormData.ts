// TODO - add proper types to this

import * as _ from "lodash";
import { filterStrToObj } from "./filterStrToObj";

/**
 * Extracts values from an internal array by filtering them.
 */
const mapArrayToField = (mapDetails: any, data: any) => {
  let targetAry = _.get(data, mapDetails.path);
  if (!targetAry) {
    return data;
  }
  // filter down based on key/value pairs
  if (mapDetails.filter) {
    const filters = filterStrToObj(mapDetails.filter);

    targetAry = targetAry.filter((target: any) => {
      const matches = filters.filter((f) => {
        return _.get(target, f.name) === f.value;
      });
      // ensure all match
      return matches.length === filters.length;
    });
  }
  const values = targetAry.map((target: any) => {
    // map the whole object or take a subset if `src` is provided
    const value = mapDetails.src ? _.get(target, mapDetails.src) : target;
    return mapDetails.asJson ? JSON.parse(value) : value;
  });

  if (values.length) {
    if (!mapDetails.allowMultiple && values.length > 1) {
      throw new Error("Found more than one value");
    }
    _.set(
      data,
      `$${mapDetails.dest}`,
      mapDetails.allowMultiple ? values : values[0],
    );
  }
};

const arrayToSingle = (mapDetails: any, data: any) => {
  const value = _.get(data, mapDetails.path);
  if (value && value.length) {
    _.set(data, mapDetails.path, _.first(value));
  }
};

/**
 * Maps values from a data object to a field.
 */
const passThroughIn = (mapDetails: any, data: any) => {
  const value = _.get(data, mapDetails.path);
  _.set(data, `$${mapDetails.dest}`, value);
};

/**
 *
 */
const passThroughOut = (mapDetails: any, data: any) => {
  const value = _.get(data, `$${mapDetails.dest}`);
  _.set(data, mapDetails.path, value);
};

/**
 * Adds a styleForm field value into an array format.
 */
const mapFieldToArray = (mapDetails: any, data: any) => {
  const value = _.get(data, `$${mapDetails.dest}`);
  // remove the mapped field, i.e. that starting with $
  const output = _.omit(data, `$${mapDetails.dest}`);

  if (value === undefined) {
    return output;
  }
  // automatically attached to the field
  const filters = mapDetails.filter ? filterStrToObj(mapDetails.filter) : [];

  const valueAry = _.isArray(value) ? value : [value];
  // rebuild the source object, using the filter details to populate the object
  const valueObjs = valueAry.map((x) => {
    // encode as string if needed
    const targetValue = mapDetails.asJson ? JSON.stringify(x) : x;

    let valueObj = {};
    if (mapDetails.src) {
      _.set(valueObj, mapDetails.src, targetValue);
    } else {
      valueObj = targetValue;
    }

    filters.map((f) => {
      _.set(valueObj, f.name, f.value);
    });
    return valueObj;
  });

  // ensure there's somewhere to put it - which could already exists if other fields write to the same field
  if (!_.has(output, mapDetails.path)) {
    _.set(output, mapDetails.path, []);
  }
  // append to current values
  const targetValues = _.get(output, mapDetails.path).concat(valueObjs);
  _.set(output, mapDetails.path, targetValues);

  return output;
};

const singleToArray = (mapDetails: any, data: any) => {
  const value = _.get(data, mapDetails.path);
  _.set(data, mapDetails.path, value ? [value] : []);
};

export const importDataUsingMapping = (data: any, mappings: any[]) => {
  const output = _.cloneDeep(data);
  mappings.map((map) => {
    // skip if transformer is for export only.
    if (map.direction === "out") {
      return;
    }
    switch (map.type) {
      case "arrayToField":
        mapArrayToField(map, output);
        break;
      case "arrayToSingle":
        arrayToSingle(map, output);
        break;
      case "passThrough":
        passThroughIn(map, output);
        break;
      default:
        throw new Error("Unknown mapping");
    }
  });
  return output;
};

export const exportDataUsingMapping = (data: any, mappings: any[]) => {
  let output = _.cloneDeep(data);
  mappings.map((map) => {
    // skip if transformer is for import only.
    if (map.direction === "in") {
      return;
    }
    switch (map.type) {
      case "arrayToField":
        output = mapFieldToArray(map, output);
        break;
      case "arrayToSingle":
        singleToArray(map, output);
        break;
      case "passThrough":
        passThroughOut(map, output);
        break;
      default:
        throw new Error("Unknown mapping");
    }
  });
  return output;
};
