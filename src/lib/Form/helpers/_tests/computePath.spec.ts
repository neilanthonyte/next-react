import { computePath } from "../computePath";

describe("Testing computePath", () => {
  it("should allow for relative paths", async (done) => {
    expect(computePath("foo.bar", "../moo")).toEqual("foo.moo");
    expect(computePath("foo.0.bar", "../moo")).toEqual("foo.0.moo");
    expect(computePath("foo.bar", "../../moo")).toEqual("moo");
    done();
  });
  it("should join paths", async (done) => {
    expect(computePath("foo", "moo")).toEqual("foo.moo");
    expect(computePath("foo.0", "moo")).toEqual("foo.0.moo");
    expect(computePath("foo.bar", "moo")).toEqual("foo.bar.moo");
    done();
  });
  it("should complain about bad paths", async (done) => {
    expect(() => {
      computePath("foo.bar", "../../../moo");
    }).toThrow();
    done();
  });
  it("should allow for absolute paths", async (done) => {
    expect(computePath("foo", "/moo")).toEqual("moo");
    expect(computePath("foo.bar", "/moo")).toEqual("moo");
    expect(computePath("foo.0.bar", "/moo")).toEqual("moo");
    done();
  });
});
