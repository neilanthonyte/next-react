import { Selector } from "testcafe";

import CovidFormCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("CovidForm").page("http://localhost:6060/#/CovidForm");

test("Do something", async (t) => {});
