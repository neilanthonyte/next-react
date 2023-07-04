import { Selector } from "testcafe";
import { PrefabArticlesCtrl } from "./index.ctrl";
import { FilterControlCtrl } from "../../../generic/FilterControl/_tests/index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PrefabArticles").page("http://localhost:6060/#!/PrefabArticles");

test("PrefabArticle has Menu, Listings and Filter", async (t) => {
  const example = Selector(toTestSelector("PrefabArticle-scenario-simple"));
  const prefabArticle = new PrefabArticlesCtrl(example, t);

  await prefabArticle.expectHasMenu();
  await prefabArticle.expectMenuHasHeader("Categories");
  await prefabArticle.expectHasListing();
  await prefabArticle.expectFiter(true);
});

test("Prefab Article filter changes the containing articles", async (t) => {
  const example = Selector(toTestSelector("PrefabArticle-scenario-simple"));
  const prefabArticle = new PrefabArticlesCtrl(example, t);

  prefabArticle.expectOnlyCommonArticles(true);
  const filter = new FilterControlCtrl(
    example.find(toTestSelector("filter-control")),
    t,
  );
  await filter.setSelectedFilter("filter-control-0");
  await prefabArticle.expectOnlyCommonArticles(false);
});

test("Prefab Artcile has Menu, Listings and NoFilter in features usage", async (t) => {
  const example = Selector(toTestSelector("PrefabArticle-scenario-features"));
  const prefabArticle = new PrefabArticlesCtrl(example, t);

  await prefabArticle.expectHasMenu();
  await prefabArticle.expectMenuHasHeader("Categories");
  await prefabArticle.expectHasListing();

  await prefabArticle.expectOnlyCommonArticles(false);
  await prefabArticle.expectFiter(false);
});
//
// test("Fail test for pipeline reporting", async t => {
//   const example = Selector(toTestSelector("PrefabArticle-scenario-features"));
//   const prefabArticle = new PrefabArticlesCtrl(example, t);
//   await prefabArticle.expectOnlyCommonArticles(true);
//   await prefabArticle.expectFiter(true);
// });
