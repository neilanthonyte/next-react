import { cssComposer } from "../cssComposer";

const css = cssComposer({
  foo: "_foo",
  bar: "_bar",
});

describe("Testing css class name builder", () => {
  it("should compose names", async (done) => {
    expect(css("foo", "bar")).toEqual("_foo _bar");
    expect(css("foo", "bar", false, undefined, null)).toEqual("_foo _bar");
    expect(
      css("foo", {
        bar: true,
      }),
    ).toEqual("_foo _bar");
    expect(
      css("foo", {
        bar: false,
      }),
    ).toEqual("_foo");
    done();
  });
});
