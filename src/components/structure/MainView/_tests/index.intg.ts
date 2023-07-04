import { Selector } from "testcafe";

import { MainViewCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("MainView").page("http://localhost:6060/#!/MainView");

// TODO - test route permissions

test("Can navigate between pages", async (t) => {
  const selector = Selector(toTestSelector("MainView-scenario-simple"));
  const component = new MainViewCtrl(selector, t);

  const firstPage = selector.find(toTestSelector("first"));
  const secondPage = selector.find(toTestSelector("second"));

  await t.expect(firstPage.exists).eql(true);
  await t.expect(secondPage.exists).eql(false);

  component.openPage("/second");

  await t.expect(firstPage.exists).eql(false);
  await t.expect(secondPage.exists).eql(true);

  component.openPage("/first");

  await t.expect(firstPage.exists).eql(true);
  await t.expect(secondPage.exists).eql(false);
});

test("Side panel shows", async (t) => {
  const selector = Selector(toTestSelector("MainView-scenario-simple"));
  const component = new MainViewCtrl(selector, t);

  component.openPage("/panel");
  const sidePanel = selector.find(toTestSelector("/panel"));
  await t.expect(sidePanel.exists).eql(true);
  await component.pageContentExists("/panel/listing_2");

  await component.clickPanelButton();
  await t.expect(sidePanel.exists).eql(true);
  await component.pageContentExists("/panel/listing/foo_2");
});

test("Side panel hides", async (t) => {
  const selector = Selector(toTestSelector("MainView-scenario-simple"));
  const component = new MainViewCtrl(selector, t);

  await component.openPage("/panel");
  await component.clickPanelButton();

  const sidePanel = selector.find(toTestSelector("side-panel"));

  const sidePanelCloseButton = sidePanel.find(toTestSelector("close-button"));
  await t.click(sidePanelCloseButton);
  await t.expect(sidePanel.visible).eql(false);

  await component.clickPanelButton();

  const sidePanelBackground = sidePanel.find(toTestSelector("background"));
  await t.click(sidePanelBackground);
  await t.expect(sidePanel.visible).eql(false);
});

test("No side panel close button", async (t) => {
  const selector = Selector(
    toTestSelector("MainView-scenario-noSidePanelClose"),
  );
  const component = new MainViewCtrl(selector, t);

  await component.openPage("/panel");
  await component.clickPanelButton();

  const sidePanel = selector.find(toTestSelector("side-panel"));

  const sidePanelCloseButton = sidePanel.find(toTestSelector("close-button"));
  await t.expect(sidePanelCloseButton.exists).eql(false);
});
