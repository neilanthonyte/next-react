import { Selector } from "testcafe";

import EhrPatientBasicsFormCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("EhrPatientBasicsForm").page(
  "http://localhost:6060/#/EhrPatientBasicsForm",
);

test("Do something", async (t) => {});
