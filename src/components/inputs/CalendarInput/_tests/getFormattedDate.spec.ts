import { formatDate } from "../helpers";

describe("Testing formatDate", () => {
  it("returns correct result for a given day", () => {
    let formattedDate = formatDate("12");
    expect(formattedDate).toEqual("12 / ");
    formattedDate = formatDate("1");
    expect(formattedDate).toEqual("1");
    formattedDate = formatDate("0");
    expect(formattedDate).toEqual("0");
    formattedDate = formatDate("00");
    expect(formattedDate).toEqual("0");
    formattedDate = formatDate("4");
    expect(formattedDate).toEqual("04 / ");
    formattedDate = formatDate("35");
    expect(formattedDate).toEqual("3");
  });

  it("returns correct result for a given month", () => {
    let formattedDate = formatDate("12 / 03");
    expect(formattedDate).toEqual("12 / 03 / ");
    formattedDate = formatDate("12 / 1");
    expect(formattedDate).toEqual("12 / 1");
    formattedDate = formatDate("12 / 0");
    expect(formattedDate).toEqual("12 / 0");
    formattedDate = formatDate("12 / 00");
    expect(formattedDate).toEqual("12 / 0");
    formattedDate = formatDate("12 / 2");
    expect(formattedDate).toEqual("12 / 02 / ");
    formattedDate = formatDate("12 / 13");
    expect(formattedDate).toEqual("12 / 1");
  });

  it("returns correct result for a given year", () => {
    const formattedDate = formatDate("12 / 03 / 2022");
    expect(formattedDate).toEqual("12 / 03 / 2022");
  });

  it("returns correct result when removing the last digit (delete key)", () => {
    // "/" wrapped in spaces (" / ") so that when hitting delete, we match " /" and know to remove last 3 chars
    let formattedDate = formatDate("12 /");
    expect(formattedDate).toEqual("1");
    formattedDate = formatDate("12 / 04 /");
    expect(formattedDate).toEqual("12 / 0");
  });

  it("returns correct result when longer than supported length", () => {
    const formattedDate = formatDate("12 / 04 / 20222222");
    expect(formattedDate).toEqual("12 / 04 / 2022");
  });
});
