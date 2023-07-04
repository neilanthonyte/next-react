// Set up some global values before bringing in the dependencies.

/* eslint-disable */
// @ts-ignore
global.env.testUrl = "http://example.com/";
/* eslint-disable */
import { substituteEnvVars } from "../substituteEnvVars";

describe("Testing substituteEnvVars", () => {
  it("should allow for absolute URLs", async (done) => {
    expect(substituteEnvVars("http://example.com")).toEqual(
      "http://example.com",
    );
    done();
  });
  it("should substitute environment vars", async (done) => {
    expect(substituteEnvVars("{testUrl}hello")).toEqual(
      // @ts-ignore
      `${global.env.testUrl}hello`,
    );
    done();
  });
  it("should error on unknown environment vars", async (done) => {
    expect(() => {
      substituteEnvVars("{missingVar}hello");
    }).toThrow();
    done();
  });
});
