import { flattenForm } from "../flattenForm";

describe("Testing flattenForm", () => {
  it("should produce the right keys", () => {
    const obj = {
      foo: "bar",
      bar: [
        {
          nim: "som",
        },
        {
          jim: "xox",
        },
      ],
      obj: {
        ric: "rol",
        ary: ["foo", "bar"],
      },
      ary: ["foo", "bar"],
    };
    const result = flattenForm(obj);
    expect(result).toEqual({
      foo: "bar",
      "bar.0.nim": "som",
      "bar.1.jim": "xox",
      "obj.ric": "rol",
      "obj.ary": ["foo", "bar"],
      ary: ["foo", "bar"],
    });
  });

  it("should allow escapes", () => {
    const obj = {
      foo: "bar",
      obj: {
        ric: "rol",
      },
    };
    expect(flattenForm(obj, ["obj"])).toEqual({
      foo: "bar",
      obj: {
        ric: "rol",
      },
    });
  });

  it("should handle undefined values", () => {
    expect(flattenForm(undefined)).toEqual(undefined);
    expect(flattenForm({ foo: [undefined, "hello"] })).toEqual({
      foo: [undefined, "hello"],
    });
  });
});
