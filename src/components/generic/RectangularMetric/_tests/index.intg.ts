import { RectangularMetricCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("RectangulatMetric").page("http://localhost:6060/#/RectangularMetric");

test("If children it renders content", async (t: TestController) => {
  const rectangularMetricCtrl = new RectangularMetricCtrl(
    Selector(toTestSelector("rectangular-metric")),
    t,
  );

  await rectangularMetricCtrl.expectToSeeContent("5");
});
