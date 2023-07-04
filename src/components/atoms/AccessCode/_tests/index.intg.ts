import { Selector } from "testcafe";
import { AccessCodeCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("AccessCode").page("http://localhost:6060/#!/AccessCode");

test("Renders the correct code to the DOM", async (t) => {
  const example = Selector(toTestSelector("AccessCode-scenario-standard"));
  const controller = new AccessCodeCtrl(example, t);
  const code = await controller.getCode();
  await t.expect(code).eql("ABCDEFG");
});
