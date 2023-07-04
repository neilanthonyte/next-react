import { Selector } from "testcafe";

import { SearchCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { searchFilters } from "../../../../handlers/SearchHandler/searchFilters";
import { AppointmentTypeCardCtrl } from "../../../atoms/AppointmentTypeCard/_tests/index.ctrl";
import { HcpCardCtrl } from "../../../atoms/HcpCard/_tests/index.ctrl";
import { LocationCardCtrl } from "../../../atoms/LocationCard/_tests/index.ctrl";

fixture("Search").page("http://localhost:6060/#/Search");

test("Search component works as expected", async (t) => {
  const example = Selector(toTestSelector("Search-scenario-standard"));
  const search = new SearchCtrl(example, t);

  await search.exists();
  await search.setValue("a");

  // Ensure any location filtering is off.
  await search.setLocationFilter(false);

  const results = await search.getResults();

  await t.expect(results.length).eql(8);
  await t
    .expect(results.filter((result) => result instanceof HcpCardCtrl).length)
    .eql(3);
  await t
    .expect(
      results.filter((result) => result instanceof LocationCardCtrl).length,
    )
    .eql(2);
  await t
    .expect(
      results.filter((result) => result instanceof AppointmentTypeCardCtrl)
        .length,
    )
    .eql(0);

  // suburbs
  const selectorDataTestAttributes = await Promise.all(
    results
      // filter items for which 'getAttribute' is not defined.
      // this will essentially remove everything but Selectors.
      .filter((result) => !!(result as Selector).getAttribute)
      .map((result: Selector) => result.getAttribute("data-test")),
  );
  await t
    .expect(
      selectorDataTestAttributes.filter((x) => x === "search-result-suburb")
        .length,
    )
    .eql(3);
});

test("Search returning no results works as expected", async (t) => {
  const example = Selector(toTestSelector("Search-scenario-standard"));
  const search = new SearchCtrl(example, t);

  await search.exists();
  await search.setValue("fail");
  await search.noResults();
});

test("Search filtering works as expected", async (t) => {
  const example = Selector(toTestSelector("Search-scenario-standard"));
  const search = new SearchCtrl(example, t);

  await search.exists();
  await search.setValue("a");

  // Ensure any location filtering is off.
  await search.setLocationFilter(false);

  const filters = await search.getFilters();
  const filterTitles = await Promise.all(
    filters.map((filter) => filter.getTitle()),
  );
  const deliveryMethodFilterIndex = filterTitles.findIndex(
    (title) =>
      title ===
      searchFilters.map((f) => f.title).find((f) => f.includes("delivery")),
  );

  const deliveryMethodFilter = filters[deliveryMethodFilterIndex];

  await deliveryMethodFilter.open();

  await deliveryMethodFilter.pickOption(2); // 'Face to Face'

  const results = await search.getResults();

  await t.expect(results.length).eql(8);
  await t
    .expect(results.filter((result) => result instanceof HcpCardCtrl).length)
    .eql(3);
  await t
    .expect(
      results.filter((result) => result instanceof LocationCardCtrl).length,
    )
    .eql(2);
  await t
    .expect(
      results.filter((result) => result instanceof AppointmentTypeCardCtrl)
        .length,
    )
    .eql(0);

  // suburbs
  const selectorDataTestAttributes = await Promise.all(
    results
      // filter items for which 'getAttribute' is not defined.
      // this will essentially remove everything but Selectors.
      .filter((result) => !!(result as Selector).getAttribute)
      .map((result: Selector) => result.getAttribute("data-test")),
  );
  await t
    .expect(
      selectorDataTestAttributes.filter((x) => x === "search-result-suburb")
        .length,
    )
    .eql(3);
});
