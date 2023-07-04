import * as _ from "lodash";

export const data: any = {
  _fieldFirst: "Label",
  fieldFirst: "value",
  _fieldSecond: "Label second",
  fieldSecond: "value",
  _booleanTrue: "Boolean (true)",
  booleanTrue: true,
  _booleanFalse: "Boolean (false)",
  booleanFalse: false,
  _missingValue: "Missing",
  missingValue: null,
  _multiValue: "Multi value",
  multiValue: ["hello", "world", "foo", "bar", "baz"],
  _group: "My group",
  group: {
    _groupField: "Foo?",
    groupField: "Bar",
  },
  groupEmpty: {
    _groupField: "Foo?",
    groupField: null,
  },
  _multiGroup: "Multi group",
  multiGroup: _.times(4, () => ({
    _firstName: "First name",
    firstName: "Jarrod",
    _lastName: "Last name",
    lastName: "Baines",
  })),
};
