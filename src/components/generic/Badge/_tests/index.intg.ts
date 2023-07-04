import { Selector } from "testcafe";
import { BadgeCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Badge").page("http://0.0.0.0:6060/#!/Badge");

test("Counter value is as expected", async (t) => {
  const example = Selector(toTestSelector("Badge-counter-correct"));

  let badgeContainer = example.find(toTestSelector("badge-one"));
  let badge = new BadgeCtrl(badgeContainer, t);
  await badge.expectCounterValue("3");

  badgeContainer = example.find(toTestSelector("badge-two"));
  badge = new BadgeCtrl(badgeContainer, t);
  await badge.expectCounterValue("106");

  badgeContainer = example.find(toTestSelector("success-badge"));
  const successBadge = new BadgeCtrl(badgeContainer, t);
  await successBadge.expectCounterValue("10");

  badgeContainer = example.find(toTestSelector("warning-badge"));
  const warningBadge = new BadgeCtrl(badgeContainer, t);
  await warningBadge.expectCounterValue("10");

  badgeContainer = example.find(toTestSelector("danger-badge"));
  const dangerBadge = new BadgeCtrl(badgeContainer, t);
  await dangerBadge.expectCounterValue("10");
});
