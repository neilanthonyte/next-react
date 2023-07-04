import { Selector } from "testcafe";
import { AcceptLegalsCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";

fixture("AcceptLegalsInput").page("http://localhost:6060/#!/AcceptLegalsInput");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

test("User can select Yes or No", async (t) => {
  const example = Selector(toTestSelector("standard-usage"));
  const acceptLegals = new AcceptLegalsCtrl(example, t);

  const selectedOption = await acceptLegals.booleanInput.appendRandom();
  await acceptLegals.expectValue(selectedOption);
});
