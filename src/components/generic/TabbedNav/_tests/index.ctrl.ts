import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { BadgeCtrl } from "../../Badge/_tests/index.ctrl";
import { NotificationsCtrl } from "../../Notifications/_tests/index.ctrl";

export class TabbedNavCtrl {
  public tabbedNav: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.tabbedNav = this.selector.find(toTestSelector("tabbedNav"));
  }

  public async expectNotificationsOnTab(tabIndex: number, value: string) {
    const tab = await this.tabbedNav.find(
      toTestSelector(`tabbedNav-item-${tabIndex}`),
    );
    const tabNotifications = new NotificationsCtrl(
      tab.find(toTestSelector("notifications")),
      this.t,
    );
    await tabNotifications.element.exists;
    await tabNotifications.expectValue(value);
  }

  public async expectBadgeOnTab(tabIndex: number, value: string) {
    const tab = await this.tabbedNav.find(
      toTestSelector(`tabbedNav-item-${tabIndex}`),
    );
    const tabBadge = new BadgeCtrl(tab.find(toTestSelector("badge")), this.t);
    await tabBadge.expectCounterValue(value);
  }

  public async clickTab(tabIndex: number) {
    const tab = await this.tabbedNav.find(
      toTestSelector(`tabbedNav-item-${tabIndex}`),
    );
    await tab.exists;
    await this.t.click(tab);
  }

  public async expectActiveTab(tabIndex: number) {
    const tab = await this.tabbedNav.find(
      toTestSelector(`tabbedNav-item-${tabIndex}`),
    );
    await tab.hasAttribute("-active");
  }
}
