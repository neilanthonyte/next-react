import { Selector } from "testcafe";

import AppScreenCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("AppScreen").page("http://localhost:6060/#/AppScreen");

test("Do something", async (t) => {});
