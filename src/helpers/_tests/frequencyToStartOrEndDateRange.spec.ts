import moment from "moment-timezone";

import { frequencyToStartOrEndDateRange } from "../frequencyToStartOrEndDateRange";
import { TFrequencies } from "next-shared/src/types/TFrequencies";

describe("frequency to start or end date range tests", () => {
  it(
    "converts unix timestamp to start or end date range based on given" +
      " frequency",
    (done) => {
      // hard code time zone so tests running on non local servers pass
      moment.tz.setDefault("Australia/Sydney");

      const timestamp = 1583717061;

      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Annual,
          moment.prototype.startOf,
        ),
      ).toEqual(1577797200);
      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Annual,
          moment.prototype.endOf,
        ),
      ).toEqual(1609419599);

      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Biannual,
          moment.prototype.startOf,
        ),
      ).toEqual(1577797200);
      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Biannual,
          moment.prototype.endOf,
        ),
      ).toEqual(1585659599);

      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Month,
          moment.prototype.startOf,
        ),
      ).toEqual(1582981200);
      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Month,
          moment.prototype.endOf,
        ),
      ).toEqual(1585659599);

      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Week,
          moment.prototype.startOf,
        ),
      ).toEqual(1583586000);
      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Week,
          moment.prototype.endOf,
        ),
      ).toEqual(1584190799);

      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Day,
          moment.prototype.startOf,
        ),
      ).toEqual(1583672400);
      expect(
        frequencyToStartOrEndDateRange(
          timestamp,
          TFrequencies.Day,
          moment.prototype.endOf,
        ),
      ).toEqual(1583758799);

      // reset timezone so we don't affect any other times
      moment.tz.setDefault();

      done();
    },
  );

  it("throws an error on unsupported frequency", (done) => {
    const timestamp = 1583717061;

    const frequency = "unsupported";

    expect(() =>
      frequencyToStartOrEndDateRange(
        timestamp,
        // @ts-ignore
        frequency,
        moment.prototype.startOf,
      ),
    ).toThrowError(new Error(`${frequency} not supported`));

    done();
  });
});
