import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FlowSummaryCtrl } from "./index.ctrl";

fixture("FlowSummary").page("http://localhost:6060/#!/FlowSummary");

test("Desktop version contains all the correct elements for next", async (t) => {
  const example = Selector(toTestSelector("scenario-basic-next"));
  const flowSummary = new FlowSummaryCtrl(example, t);
  await t.expect(flowSummary.header.exists).ok();
  await t.expect(flowSummary.content.innerText).contains("Location");
  await t.expect(flowSummary.footer.visible).notOk();
});
