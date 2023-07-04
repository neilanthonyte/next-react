import { BodyCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Body").page("http://localhost:6060/#/Body");

test("Body should always be open when not placed in a collapsible context", async (t) => {
  const scenario: Selector = Selector(toTestSelector("Body-scenario-basic"));
  const body: BodyCtrl = new BodyCtrl(scenario, t);
  await t.expect(await body.isOpen()).eql(true);
  await t.expect(await body.canBeClosed()).eql(false);
});

test("Body should be closible when opened in a collapsible context", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Body-scenario-collapsible-context"),
  );
  const body: BodyCtrl = new BodyCtrl(scenario, t);
  await t.expect(await body.isOpen()).eql(true);
  await t.expect(await body.canBeClosed()).eql(true);
});
