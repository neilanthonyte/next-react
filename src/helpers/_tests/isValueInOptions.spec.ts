import { isValueInOptions } from "../isValueInOptions";

describe("Testing checkArrayContent", () => {
  it("should return true when value (string) is contained in options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, "foo")).toEqual(true);
  });

  it("should return true when value (array) is contained in options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, ["foo"])).toEqual(true);
  });

  it("should return false when the value (string) not is contained in options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, "notFoo")).toEqual(false);
  });

  it("should return false when the value (array) not is contained in options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, ["notFoo"])).toEqual(false);
  });

  it("should return false when a value in an array is not contained in options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, ["foo", "notFoo"])).toEqual(false);
  });

  it("should return true when all values in an array are contained in the options array", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, ["foo", "notFoo"])).toEqual(false);
  });

  it("should return true when the value is an empty string", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, "")).toEqual(true);
  });

  it("should return true when the value is undefined", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, undefined)).toEqual(true);
  });

  it("should return false when the value is null", () => {
    const optionsArray = [
      { label: "foo", value: "foo" },
      { label: "bar", value: "bar" },
      { label: "baz", value: "baz" },
      { label: "qux", value: "qux" },
    ];
    expect(isValueInOptions(optionsArray, null)).toEqual(true);
  });
});
