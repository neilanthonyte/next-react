import * as validate from "validate.js";
import moment from "moment";

import medicareNumber from "./validations/medicareNumber";
import remoteCheck from "./validations/remoteCheck";
import mustEqual from "./validations/mustEqual";
import dvaNumber from "./validations/dvaNumber";
import concessionCardNumber from "./validations/concessionCardNumber";
import maxLength from "./validations/maxLength";
import dateFormat from "./validations/dateFormat";
import remoteSuggestionValidator from "./validations/remoteSuggestionValidator";
import { deepWithin } from "./validations/deepWithin";
import phone from "./validations/phone";
import mobilePhone from "./validations/mobilePhone";

// Add custom validators to the validator
validate.validators.medicareNumber = medicareNumber;
validate.validators.remoteCheck = remoteCheck;
validate.validators.mustEqual = mustEqual;
validate.validators.dvaNumber = dvaNumber;
validate.validators.concessionCardNumber = concessionCardNumber;
validate.validators.maxLength = maxLength;
validate.validators.dateFormat = dateFormat;
validate.validators.remoteSuggestionValidator = remoteSuggestionValidator;
validate.validators.deepWithin = deepWithin;
validate.validators.phone = phone;
validate.validators.mobilePhone = mobilePhone;

// Override original dateTime
validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value: any, options: any) {
    // Strict on what format we accept
    const date = moment(value, options.format, true);
    if (!date.isValid()) return NaN;
    return date.unix();
  },

  // Input is a unix timestamp
  format: function (value: any, options: any) {
    return moment.utc(value).format(options.format);
  },
});

export default validate;
