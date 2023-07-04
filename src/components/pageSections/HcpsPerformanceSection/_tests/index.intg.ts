import { Selector } from "testcafe";

import HcpsPerformanceSectionCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("HcpsPerformanceSection").page(
  "http://localhost:6060/#/HcpsPerformanceSection",
);

test("Do something", async (t) => {});
