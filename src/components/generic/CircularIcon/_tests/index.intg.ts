import { CircularIconCtrl } from "./index.ctrl";
import { Selector, t } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Circulaticon").page("http://localhost:6060/#!/CircularIcon");

test("If onClick prop, it executes the callback fn", async (t: TestController) => {
  const sel = Selector(toTestSelector("CircularIcon-scenario-click"));
  const circularIconCtrl = new CircularIconCtrl(
    Selector(toTestSelector("CircularIcon-scenario-click")),
    t,
  );

  const label = sel.find(toTestSelector("label")).innerText;

  await t.expect(label).eql("");
  await circularIconCtrl.click();
  await t.expect(label).eql("Click");
});
