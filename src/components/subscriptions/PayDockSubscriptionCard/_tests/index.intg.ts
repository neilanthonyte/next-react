import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { PayDockSubscriptionCardCtrl } from "./index.ctrl";

fixture("PayDockSubscriptionCard").page(
  "http://0.0.0.0:6060/#!/PayDockSubscriptionCard",
);

test("Subscription card is present", async (t) => {
  const example = Selector(
    toTestSelector("PayDockSubscriptionCard-subscription-base"),
  );
  const payments = new PayDockSubscriptionCardCtrl(example, t);
  await payments.expectHeader("Active subscription");
  await payments.expectBilling("Last billing");
});
