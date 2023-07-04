import * as _ from "lodash";
import moment from "moment";

/**
 * Sanity check to ensure we have a dateFormat.
 */
export default (value: any, options: any) => {
  if (!options.dateFormat) {
    return "^Internal error";
  }
  if (_.isString(value) && !moment(value, options.dateFormat, true).isValid()) {
    return "^The date is incomplete";
  }
};
