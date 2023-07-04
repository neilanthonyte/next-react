import { Selector } from "testcafe";

import NextManagerDecorationCtrl from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("NextManagerDecoration").page(
  "http://localhost:6060/#/NextManagerDecoration",
);

test("Do something", async (t) => {});
