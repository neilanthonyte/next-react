import { filterStrToObj } from "../filterStrToObj";

describe("Testing filterStrToObj", () => {
  it("should remap string to object", async (done) => {
    expect(filterStrToObj("a=b")).toEqual([{ name: "a", value: "b" }]);
    expect(filterStrToObj("a=b|c=d")).toEqual([
      { name: "a", value: "b" },
      { name: "c", value: "d" },
    ]);
    done();
  });
});
