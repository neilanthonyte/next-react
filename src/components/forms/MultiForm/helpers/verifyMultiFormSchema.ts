import * as _ from "lodash";

export const verifyMultiFormSchema = (multiFormSchema: any) => {
  if (!_.isArray(_.get(multiFormSchema, "sections"))) {
    throw new Error("missing sections");
  }
};

// HACK - legacy support
export default verifyMultiFormSchema;
