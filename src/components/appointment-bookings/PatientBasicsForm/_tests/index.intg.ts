import { Selector } from "testcafe";

import PatientBasicsFormCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PatientBasicsForm").page("http://localhost:6060/#/PatientBasicsForm");

test("Do something", async (t) => {});
