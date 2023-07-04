import { Selector } from "testcafe";
import { ActionCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Action").page("http://localhost:6060/#!/Action");

test("action buttons to display correct values as defined by props", async (t) => {
  const example = Selector(toTestSelector("Action-scenario-standard"));
  const action = new ActionCtrl(example, t);
  await action.expectButtonLabel("Update", 0);
});
