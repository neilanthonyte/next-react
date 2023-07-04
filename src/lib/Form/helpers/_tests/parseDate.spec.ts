// HACK - https://github.com/aurelia/skeleton-navigation/issues/606
import moment from "moment";

import { parseDate as dateParser } from "../parseDate";

describe("Testing parseDate", () => {
  it("should return the current date", () => {
    expect(dateParser("NOW()", "YYYY-MM-DD")).toEqual(
      moment().format("YYYY-MM-DD"),
    );
  });

  it("should accept date strings", () => {
    expect(dateParser("2000-01-01", "YYYY-MM-DD")).toEqual("2000-01-01");
    // TODO: Cleans up the string
    // NOT sure about this test. Zeros are added when it hits the styleForm.
    // Should that be moved into parseDateHelper??/???
    // expect(dateParser("2010-1-1")).toEqual("2010-01-01");
  });

  it("should not accept invalid date strings", () => {
    // TODO: non-existent date
    expect(() => {
      dateParser("2010-13-01", "YYYY-MM-DD");
    }).toThrow();
    expect(() => {
      dateParser("2010-12-41", "YYYY-MM-DD");
    }).toThrow();
    expect(() => {
      dateParser("201-13-01", "YYYY-MM-DD");
    }).toThrow();

    // Floating point offsets
    expect(() => {
      dateParser("NOW().offset(-7.5,'years')", "YYYY-MM-DD");
    }).toThrow();
  });

  it("should accept different offset sizes", () => {
    // Positive
    expect(dateParser("NOW().offset(7,'days')", "YYYY-MM-DD")).toEqual(
      moment().add(7, "days").format("YYYY-MM-DD"),
    );
    // Multiple digits
    expect(dateParser("NOW().offset(17,'days')", "YYYY-MM-DD")).toEqual(
      moment().add(17, "days").format("YYYY-MM-DD"),
    );
    // Triple digit offsets
    expect(dateParser("NOW().offset(170,'days')", "YYYY-MM-DD")).toEqual(
      moment().add(170, "days").format("YYYY-MM-DD"),
    );
    // Negative
    expect(dateParser("NOW().offset(-7,'days')", "YYYY-MM-DD")).toEqual(
      moment().add(-7, "days").format("YYYY-MM-DD"),
    );
  });

  it("should allow for shorter date strings YYYY-MM", () => {
    expect(dateParser("2020-02", "YYYY-MM")).toEqual("2020-02");
  });

  it("should allow for whitespace", () => {
    // Optional plus
    expect(dateParser("NOW().offset(+7,'days')", "YYYY-MM-DD")).toEqual(
      moment().add(7, "days").format("YYYY-MM-DD"),
    );
    // Allowable whitespace
    expect(dateParser("NOW().offset( 7, 'days' )", "YYYY-MM-DD")).toEqual(
      moment().add(7, "days").format("YYYY-MM-DD"),
    );
  });

  it("should accept DAYS, MONTHS, and YEARS", () => {
    expect(dateParser("NOW().offset(-7,'days')", "YYYY-MM-DD")).toEqual(
      moment().subtract(7, "days").format("YYYY-MM-DD"),
    );
    expect(dateParser("NOW().offset(-7,'months')", "YYYY-MM-DD")).toEqual(
      moment().subtract(7, "months").format("YYYY-MM-DD"),
    );
    expect(dateParser("NOW().offset(-7,'years')", "YYYY-MM-DD")).toEqual(
      moment().subtract(7, "years").format("YYYY-MM-DD"),
    );
  });

  it("should allow for offset chaining", () => {
    expect(
      dateParser("NOW().offset(7,'days').offset(1,'years')", "YYYY-MM-DD"),
    ).toEqual(moment().add(7, "days").add(1, "year").format("YYYY-MM-DD"));
    // TODO: add more to check different combinations
  });
});
