import { Selector } from "testcafe";
import { HeaderCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { BodyCtrl } from "../../Body/_tests/index.ctrl";

fixture("Header").page("http://localhost:6060/#/Header");

test("Header should be able to control the collapsible content when placed in a collapsible context", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Header-scenario-control-collapse"),
  );
  const header: HeaderCtrl = new HeaderCtrl(scenario, t);
  const body: BodyCtrl = new BodyCtrl(scenario, t);

  await header.hasActions(false);
  await header.clickHeader();
  await t.expect(await body.isOpen()).eql(true);
  await t.expect(await body.canBeClosed()).eql(true);
  await header.clickHeader();
  await t.wait(1000);
  await t.expect(await body.isOpen()).eql(false);
  await t.expect(await body.canBeClosed()).eql(false);
});

test("Clicking an icon action should invoke the corresponding onClick callback", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Header-scenario-icon-action"),
  );
  const header: HeaderCtrl = new HeaderCtrl(scenario, t);
  await header.hasActions(true);
  const action = scenario.find(toTestSelector("action")).innerText;
  await header.clickAction(0);
  await t.expect(action).eql("Action: clicked");
});

test("Clicking a label action should invoke the corresponding onClick callback", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Header-scenario-label-action"),
  );
  const header: HeaderCtrl = new HeaderCtrl(scenario, t);
  await header.hasActions(true);
  const action = scenario.find(toTestSelector("action")).innerText;
  await header.clickAction(0);
  await t.expect(action).eql("Action: clicked");
});
