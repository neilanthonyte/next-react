import { InteractionBlockerCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("InteractionBlocker").page(
  "http://localhost:6060/#/InteractionBlocker",
);

test("basic", async (t) => {
  const scenario = Selector(
    toTestSelector("InteractionBlocker-scenario-basic"),
  );
  const interactionBlocker = new InteractionBlockerCtrl(scenario, t);

  await interactionBlocker.exists(true);
  await interactionBlocker.isBlockingInteraction(true);
});
