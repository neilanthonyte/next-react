import { MetricGroupCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("MetricGroup").page("http://localhost:6060/#/MetricGroup");

test("If children, it renders expected amount", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-titles")),
    t,
  );
  await metricGroupCtrl.checkChildrenCount(3);
});

test("If children, it renders expected size", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-titles")),
    t,
  );
  await metricGroupCtrl.checkStandardSize("stdSize-md");
});

test("If children have titles, it renders title", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-titles")),
    t,
  );
  await metricGroupCtrl.expectMetricTitleToRender();
});

test("If children do not have titles, it does not renders title", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-no-titles")),
    t,
  );
  await metricGroupCtrl.expectMetricTitleToNotRender();
});

test("children should display inner value", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-titles")),
    t,
  );

  await metricGroupCtrl.expectMetricValueToBe("145");
});

test("metric group should apply standard sizing to all children", async (t: TestController) => {
  const metricGroupCtrl = new MetricGroupCtrl(
    Selector(toTestSelector("metric-group-with-titles")),
    t,
  );

  await metricGroupCtrl.checkStandardSize("stdSize-md");
});
