import { fahrenheitToCelsius } from "../fahrenheitToCelsius";

describe("convert fahrenheit to celcius", () => {
  it("it should match equivalent celcius temperature", async (done) => {
    expect(fahrenheitToCelsius(109.976)).toEqual(43.32);
    done();
  });
});
