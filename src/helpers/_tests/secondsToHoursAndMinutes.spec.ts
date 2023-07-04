import { secondsToHoursAndMinutes } from "../secondsToHoursAndMinutes";

describe("convert seconds to time left", () => {
  it("it should match expected time left", async (done) => {
    expect(secondsToHoursAndMinutes(1000)).toEqual("00h 16m");
    done();
  });

  it("it should match expected time left", async (done) => {
    expect(secondsToHoursAndMinutes(5000)).toEqual("01h 23m");
    done();
  });

  it("it should match expected time left", async (done) => {
    expect(secondsToHoursAndMinutes(150000)).toEqual("41h 40m");
    done();
  });
});
