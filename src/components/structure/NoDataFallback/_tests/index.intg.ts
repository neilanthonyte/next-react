import { NoDataFallbackCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { Selector } from "testcafe";

import { customMessage } from "../_example";
import { defaultMessage } from "../defaultMessage";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("NoDataFallback").page("http://localhost:6060/#!/NoDataFallback");

test("If no children, the default no data message is rendered", async (t: TestController) => {
  const noDataFallback = Selector(
    toTestSelector("NoDataFallback-scenario-empty-default"),
  );
  const noDataFallbackCtrl = new NoDataFallbackCtrl(noDataFallback, t);
  await noDataFallbackCtrl.expectToShowFallback(defaultMessage);
});

test("If no children and message prop, the custom message is rendered", async (t: TestController) => {
  const noDataFallbackCtrl = new NoDataFallbackCtrl(
    Selector(toTestSelector("NoDataFallback-scenario-empty-custom")),
    t,
  );
  await noDataFallbackCtrl.expectToShowFallback(customMessage);
});

test("If children it renders content", async (t: TestController) => {
  const noDataFallbackCtrl = new NoDataFallbackCtrl(
    Selector(toTestSelector("NoDataFallback-scenario-with-children")),
    t,
  );
  await noDataFallbackCtrl.expectToShowContent(
    "The quick brown fox jumps over a lazy dog",
  );
});

test("If children components, it renders content", async (t: TestController) => {
  const noDataFallbackCtrl = new NoDataFallbackCtrl(
    Selector(toTestSelector("NoDataFallback-scenario-with-children-component")),
    t,
  );
  const buttonCtrl = new ButtonCtrl(noDataFallbackCtrl.content, t);

  await noDataFallbackCtrl.expectToShowContent();
  await buttonCtrl.expectLabel("Click me!");
});

test("If actions prop, it renders buttons with the correct label and callback", async (t: TestController) => {
  const noDataFallbackCtrl = new NoDataFallbackCtrl(
    Selector(toTestSelector("NoDataFallback-scenario-fallback-actions")),
    t,
  );
  await noDataFallbackCtrl.expectToShowFallback();
  await noDataFallbackCtrl.checkAction(0);
});
