import { CircularMetricCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("CircularMeric").page("http://localhost:6060/#/CircularMetric");

test("If children it renders content", async (t: TestController) => {
  const circularMetricCtrl = new CircularMetricCtrl(
    Selector(toTestSelector("circular-metric")),
    t,
  );

  await circularMetricCtrl.expectToSeeContent("245");
});
