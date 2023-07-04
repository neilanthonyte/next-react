import { Selector } from "testcafe";
import { PendingContentCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PendingContent").page("http://localhost:6060/#!/PendingContent");

test("Can toggle between content", async (t) => {
  const example = Selector(
    toTestSelector("PendingContent-fallbackContent-toggle"),
  );

  const pendingContentCtrl = new PendingContentCtrl(
    example.find(toTestSelector("component")),
    t,
  );
  const toggleLink = example.find(toTestSelector("toggle"));

  await t.wait(500);
  await pendingContentCtrl.expectFallbackShowing();
  // toggle the content on
  await t.click(toggleLink);
  await t.wait(500);
  await pendingContentCtrl.expectContentShowing();
});
