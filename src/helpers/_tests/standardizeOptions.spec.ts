import { standardizeOptions } from "../standardizeOptions";

describe("Testing standardizeOptions", () => {
  it("should produce the right keys", async (done) => {
    const output = [
      {
        label: "foo",
        value: "foo",
      },
      {
        label: "bar",
        value: "bar",
      },
    ];

    expect(standardizeOptions(["foo", "bar"])).toEqual(output);
    expect(standardizeOptions({ foo: "foo", bar: "bar" })).toEqual(output);
    expect(standardizeOptions(output)).toEqual(output);
    done();
  });
  it("should handle the key/values correctly", async (done) => {
    const output = [
      {
        label: "FOO",
        value: "foo",
      },
      {
        label: "BAR",
        value: "bar",
      },
    ];
    expect(standardizeOptions({ FOO: "foo", BAR: "bar" })).toEqual(output);
    expect(standardizeOptions(output)).toEqual(output);
    done();
  });
});
