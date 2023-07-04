import { dateStringMatchesFormatString } from "../dateStringMatchesFormatString";

describe("Testing dateStringMatchesFormatString", () => {
  it("should return true when the dateString matches the dateFormat", () => {
    expect(dateStringMatchesFormatString("2018-04-22", "YYYY-MM-DD")).toEqual(
      true,
    );
    expect(dateStringMatchesFormatString("2018-04", "YYYY-MM")).toEqual(true);
    expect(dateStringMatchesFormatString("04-22", "MM-DD")).toEqual(true);
    expect(dateStringMatchesFormatString("2018", "YYYY")).toEqual(true);
  });

  it("should return false when the dateString does not match the dateFormat", () => {
    expect(dateStringMatchesFormatString("2018-11-22", "YYYY-MM")).toEqual(
      false,
    );
    expect(dateStringMatchesFormatString("2018-11-22", "MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11-22", "YYYY")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11-22", "MM")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11-22", "DD")).toEqual(false);

    expect(dateStringMatchesFormatString("2018-11", "YYYY-MM-DD")).toEqual(
      false,
    );
    expect(dateStringMatchesFormatString("2018-11", "MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11", "YYYY")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11", "MM")).toEqual(false);
    expect(dateStringMatchesFormatString("2018-11", "DD")).toEqual(false);

    expect(dateStringMatchesFormatString("11-21", "YYYY-MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("11-21", "YYYY-MM")).toEqual(false);
    expect(dateStringMatchesFormatString("11-21", "YYYY")).toEqual(false);
    expect(dateStringMatchesFormatString("11-21", "MM")).toEqual(false);
    expect(dateStringMatchesFormatString("11-21", "DD")).toEqual(false);

    expect(dateStringMatchesFormatString("2018", "YYYY-MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("2018", "YYYY-MM")).toEqual(false);
    expect(dateStringMatchesFormatString("2018", "MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("2018", "MM")).toEqual(false);
    expect(dateStringMatchesFormatString("2018", "DD")).toEqual(false);

    expect(dateStringMatchesFormatString("12", "YYYY-MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("12", "YYYY-MM")).toEqual(false);
    expect(dateStringMatchesFormatString("12", "MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("12", "YYYY")).toEqual(false);

    expect(dateStringMatchesFormatString("30", "YYYY-MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("30", "YYYY-MM")).toEqual(false);
    expect(dateStringMatchesFormatString("30", "MM-DD")).toEqual(false);
    expect(dateStringMatchesFormatString("30", "MM")).toEqual(false);
    expect(dateStringMatchesFormatString("30", "YYYY")).toEqual(false);
  });
});
