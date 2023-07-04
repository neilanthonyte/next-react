import { Selector } from "testcafe";
import { OpsArticlesViewCtrl } from "./index.ctrl";
import { FilterControlCtrl } from "../../../generic/FilterControl/_tests/index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("OpsArticlesView").page("http://localhost:6060/#!/OpsArticlesView");

test("OpsArticles are displayed correctly", async (t) => {
  const example = Selector(toTestSelector("OpsArticlesView-scenario-standard"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

  await opsArticles.expectHeader("Handbook");
  await opsArticles.expectChapterHeader("Jump to");
  await opsArticles.expectHasArticles();
});

// This test appears to rely on an "isFavourite" prop being passed to the
// <Listing /> element in OpsArticlesView (as this would cause the
// FilterControl that this test is trying to find to appear.). This is no
// longer the case, so OpsArticles can never be filtered.
// For this reason the test is skipped. If filtering OpsArticles becomes
// available in the future this test can be reenabled.
test.skip("OpsArticles can be filtered", async (t) => {
  const example = Selector(toTestSelector("OpsArticlesView-scenario-standard"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

  await opsArticles.expectHasArticles();
  await opsArticles.expectOnlyCommonArticles(true);
  const commonArticlesNum: number = await opsArticles.getCommonArticlesNum();
  const filter = new FilterControlCtrl(
    example.find(toTestSelector("filter-control")),
    t,
  );
  await filter.setSelectedFilter("filter-control-0");

  await opsArticles.expectOnlyCommonArticles(false);
  await opsArticles.expectCommonArticlesPreserved(commonArticlesNum);
});

test("OpsArticles load has a loader if displayed with a delay", async (t) => {
  const example = Selector(toTestSelector("OpsArticlesView-scenario-standard"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

  await opsArticles.expectLoaderOnDelay(500);
  await opsArticles.expectHasArticles();
});
