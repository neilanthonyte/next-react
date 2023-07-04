import { Selector } from "testcafe";

import AppointmentBookingToolCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("AppointmentBookingTool").page(
  "http://localhost:6060/#/AppointmentBookingTool",
);

test("Do something", async (t) => {});
