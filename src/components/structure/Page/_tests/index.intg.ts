import { PageCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { PageSectionCtrl } from "../../PageSection/_tests/index.ctrl";

fixture("Page").page("http://localhost:6060/#/Page");

test("basic", async (t) => {
  const scenario = Selector(toTestSelector("Page-scenario-basic"));
  const page = new PageCtrl(scenario, t);

  await page.exists(true);
  await page.header.exists(true);
  await page.body.exists(true);
});

test("with page header options", async (t) => {
  const scenario = Selector(
    toTestSelector("Page-scenario-page-header-options"),
  );
  const page = new PageCtrl(scenario, t);

  await page.exists(true);
  await page.header.exists(true);
  await page.body.exists(true);
  await page.header.options.exists(true);
});

test("with page sections", async (t) => {
  const scenario = Selector(toTestSelector("Page-scenario-page-sections"));
  const page = new PageCtrl(scenario, t);
  const pageSections = page.body.body.find(
    toTestSelector(PageSectionCtrl.selector),
  );

  await page.exists(true);
  await page.header.exists(true);
  await page.body.exists(true);
  await t.expect(pageSections.count).eql(2);
});
