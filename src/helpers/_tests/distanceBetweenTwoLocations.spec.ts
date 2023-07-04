import { distanceBetweenTwoLocations } from "next-shared/src/helpers/distanceBetweenTwoLocations";
import { IGeo } from "next-shared/src/types/IGeo";

describe("calc correct distance between two points", () => {
  it("it should match distance expected", async (done) => {
    const startLocation: IGeo = {
      lng: 150.919487,
      lat: -33.645231,
    };
    const endLocation: IGeo = {
      lng: 150.841251,
      lat: -33.719952,
    };

    expect(
      distanceBetweenTwoLocations(startLocation, endLocation).toFixed(2),
    ).toEqual("11.02");
    done();
  });
});
