import { humaneDate } from "../humaneDate";

describe(humaneDate, () => {
  it("formats a unix timestamp as an Australian date", () =>
    expect(humaneDate(1675719379)).toBe("07/02/2023"));
});
