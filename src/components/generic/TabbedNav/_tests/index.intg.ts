import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { TabbedNavCtrl } from "./index.ctrl";
import { testTabbedNavItems } from "../readme";

fixture("TabbedNav").page("http://localhost:6060/#/TabbedNav");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/generic/TabbedNav/index.tsx yarn dev
 * yarn testcafe ./src/components/generic/TabbedNav/_tests/index.intg.ts
 * ```
 */

test("Tab is interactable", async (t) => {
  const selector = Selector(selectDemo("TabbedNav", "standard"));

  const component = new TabbedNavCtrl(selector.find(selectComponent()), t);

  await component.clickTab(0);
  await component.expectActiveTab(0);
  await component.clickTab(1);
  await component.expectActiveTab(1);
});

test("Disabled tabs is not interactable", async (t) => {
  const disabledTabIndex = testTabbedNavItems.findIndex((t) => t.isDisabled);
  const enabledTabIndex = testTabbedNavItems.findIndex((t) => !t.isDisabled);
  // not found, return
  if (disabledTabIndex === -1 || enabledTabIndex === -1) return;

  const selector = Selector(selectDemo("TabbedNav", "standard"));

  const component = new TabbedNavCtrl(selector.find(selectComponent()), t);

  await component.clickTab(enabledTabIndex);
  await component.clickTab(disabledTabIndex);
  await component.expectActiveTab(enabledTabIndex);
});

test("Tab shows notifications", async (t) => {
  const tabWithNotificationsIndex = testTabbedNavItems.findIndex(
    (t) => t.notifications > 0,
  );
  // not found, return
  if (tabWithNotificationsIndex === -1) return;

  const notificationsAmount =
    testTabbedNavItems[tabWithNotificationsIndex].notifications;

  const selector = Selector(selectDemo("TabbedNav", "standard"));
  const component = new TabbedNavCtrl(selector.find(selectComponent()), t);
  await component.expectNotificationsOnTab(
    tabWithNotificationsIndex,
    notificationsAmount.toString(),
  );
});

test("Tab shows badge", async (t) => {
  const tabWithBadgeIndex = testTabbedNavItems.findIndex((t) => !!t.badge);
  // not found, return
  if (tabWithBadgeIndex === -1) return;

  const badgeLabel = testTabbedNavItems[tabWithBadgeIndex].badge;

  const selector = Selector(selectDemo("TabbedNav", "standard"));
  const component = new TabbedNavCtrl(selector.find(selectComponent()), t);
  await component.expectBadgeOnTab(tabWithBadgeIndex, badgeLabel);
});
