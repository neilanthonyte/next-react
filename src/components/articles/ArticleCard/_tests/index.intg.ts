import { Selector } from "testcafe";
import { ArticleCardCtrl } from "./index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Article Card").page("http://localhost:6060/#!/ArticleCard");

test("Article with an image and no autor displays correctly", async (t) => {
  const example = Selector(toTestSelector("Article-scenario-standard"));
  const article = example.find(toTestSelector("content-grid-0"));
  const articleCard = new ArticleCardCtrl(article, t);

  // TODO Inga to replace by Mock article data
  await articleCard.expectHeader("My great article");
  await articleCard.expectUrl("example");
  await articleCard.expectHasDescription();
  await articleCard.expectPosterImage(true);
  await articleCard.expectIcons(false);
  await articleCard.expectActions(false);
  await articleCard.expectHasAuthor(false);
});

test("Article with an image and an autor displays correctly", async (t) => {
  const example = Selector(toTestSelector("Article-scenario-standard"));
  const article = example.find(toTestSelector("content-grid-1"));
  const articleCard = new ArticleCardCtrl(article, t);

  await articleCard.expectHeader("My great article");
  await articleCard.expectUrl("example");
  await articleCard.expectHasDescription();
  await articleCard.expectHasAuthor(true);
  await articleCard.expectIcons(false);
  await articleCard.expectActions(false);
  await articleCard.expectPosterImage(true);
});

test("Article with no image and no author displays correctly", async (t) => {
  const example = Selector(toTestSelector("Article-scenario-standard"));
  const article = example.find(toTestSelector("content-grid-2"));
  const articleCard = new ArticleCardCtrl(article, t);

  await articleCard.expectHeader("My great article");
  await articleCard.expectUrl("example");
  await articleCard.expectHasDescription();
  await articleCard.expectHasAuthor(false);
  await articleCard.expectIcons(false);
  await articleCard.expectActions(false);
  await articleCard.expectPosterImage(false);
});

test("Article with children displays correctly", async (t) => {
  const article = Selector(toTestSelector("Article-scenario-children")).child();
  const articleCard = new ArticleCardCtrl(article, t);

  await articleCard.expectHeader("My great article");
  await articleCard.expectHasDescription();
  await articleCard.expectHasAuthor(false);
  await articleCard.expectIcons(true);
  await articleCard.expectActions(false);
  await articleCard.expectPosterImage(true);
});

test("Article with actions displays correctly", async (t) => {
  const article = Selector(toTestSelector("Article-scenario-actions")).child();
  const articleCard = new ArticleCardCtrl(article, t);

  await articleCard.expectHeader("My great article");
  await articleCard.expectHasDescription();
  await articleCard.expectHasAuthor(false);
  await articleCard.expectIcons(true);
  await articleCard.expectActions(true, 2);
  await articleCard.expectPosterImage(true);
});
