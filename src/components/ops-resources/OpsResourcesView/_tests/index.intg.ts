import { Selector } from "testcafe";
import { OpsArticlesViewCtrl } from "./index.ctrl";
import { FilterControlCtrl } from "../../../generic/FilterControl/_tests/index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("OpsArticlesView").page("http://localhost:6060/#!/OpsArticlesView");

test("OpsArticles are displayed correctly", async (t) => {
  const example = Selector(toTestSelector("OpsArticlesView-scenario-standard"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

  await opsArticles.expectHeader("Operational Articles");
  await opsArticles.expectChapterHeader("Bar");
  await opsArticles.expectHasArticles();
});

test("OpsArticles can be filtered", async (t) => {
  const example = Selector(toTestSelector("OpsArticlesView-scenario-standard"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

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
  const example = Selector(toTestSelector("OpsArticlesView-scenario-delay"));
  const opsArticles = new OpsArticlesViewCtrl(example, t);

  await opsArticles.expectLoaderOnDelay(500);
  await opsArticles.expectHasArticles();
});
