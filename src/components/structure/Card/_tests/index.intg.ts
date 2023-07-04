import { CardCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Card").page("http://localhost:6060/#/Card");

test("If no content, renders NoFallback", async (t: TestController) => {
  const cardCtrl = new CardCtrl(
    Selector(toTestSelector("card-scenario-empty")),
    t,
  );
  await cardCtrl.expectToShowFallback();
});

test("If children, it renders content", async (t: TestController) => {
  const cardCtrl = new CardCtrl(
    Selector(toTestSelector("card-scenario-with-children")),
    t,
  );
  await cardCtrl.expectToShowBodyContent(
    "rem quod cum dolorum error unde et culpa saepe quos pariatur ullam consequuntur sit et libero in maiores totam hic",
  );
});

test("If card title, render content", async (t: TestController) => {
  const cardCtrl = new CardCtrl(
    Selector(toTestSelector("card-scenario-with-children")),
    t,
  );

  await cardCtrl.expectToShowHeaderTitle("I am title");
});

test("If card datasets, render content", async (t: TestController) => {
  const cardCtrl = new CardCtrl(
    Selector(toTestSelector("card-scenario-with-datasets")),
    t,
  );

  await cardCtrl.expectToShowDatasets("245");
});

test("If card pending, show Loading overlay", async (t: TestController) => {
  const cardCtrl = new CardCtrl(
    Selector(toTestSelector("card-scenario-with-pending-content")),
    t,
  );

  await cardCtrl.expectToSeeLoader();
});
