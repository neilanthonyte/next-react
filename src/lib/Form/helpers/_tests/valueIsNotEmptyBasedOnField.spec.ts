import { valueIsNotEmptyBasedOnField } from "../valueIsNotEmptyBasedOnField";

describe("Testing valueIsEmptyBasedOnField", () => {
  it("should return false when field value is null", () => {
    const value: any = null;
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return false when field value is an empty string", () => {
    const value = "";
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return false when field value is an empty array", () => {
    const value: any = [];
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return false when field value is an empty object", () => {
    const value = {};
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return true when field contains a string value", () => {
    const value = "A value";
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return true when field contains an array value", () => {
    const value = ["value", "another"];
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return true when field contains an object value", () => {
    const value = { label: "label", value: "value" };
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return true when field contains a number value", () => {
    const value = 8787;
    const field = {
      type: "text",
      map: "text",
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return false when field value is null - allowMultiple = true", () => {
    const value: any = null;
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return false when field value is an empty string - allowMultiple = true", () => {
    const value = "";
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return false when field value is an empty array - allowMultiple = true", () => {
    const value: any = [];
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return false when field value is an empty object - allowMultiple = true", () => {
    const value = {};
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });

  it("should return true when field contains a string value - allowMultiple = true", () => {
    const value = "A value";
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return true when field contains an array value - allowMultiple = true", () => {
    const value = ["value", "another"];
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return false when field contains an object value - allowMultiple = true", () => {
    const value = [{ label: "label", value: "value" }];
    const field = {
      type: "options",
      map: "text",
      options: [
        { label: "label1", value: "value1" },
        { label: "label2", value: "value2" },
      ],
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(true);
  });

  it("should return false when field contains a number value - allowMultiple = true", () => {
    const value = 8787;
    const field = {
      type: "text",
      map: "text",
      allowMultiple: true,
    };
    expect(valueIsNotEmptyBasedOnField(value, field)).toBe(false);
  });
});
