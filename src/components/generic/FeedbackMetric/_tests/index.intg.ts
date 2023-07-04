import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FeedbackMetricCtrl } from "./index.ctrl";

fixture("FeedbackMetric").page("http://localhost:6060/#/FeedbackMetric");

test.skip("The correct value is displayed", async (t) => {
  const example = Selector(toTestSelector("FeedbackMetric-scenario-standard"));
  const component = new FeedbackMetricCtrl(example, t);
  await component.checkValue("10");
});

test.skip("The correct label is displayed", async (t) => {
  const example = Selector(toTestSelector("FeedbackMetric-scenario-standard"));
  const component = new FeedbackMetricCtrl(example, t);
  await component.checkLabel("PATIENTS");
});
