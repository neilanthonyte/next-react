import { celsiusToFahrenheit } from "../celsiusToFahrenheit";

describe("convert celcius to fahrenheit", () => {
  it("it should match equivalent fahrenheit temperature", async (done) => {
    expect(celsiusToFahrenheit(43.32)).toEqual(109.976);
    done();
  });
});
