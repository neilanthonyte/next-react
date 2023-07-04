import { Selector } from "testcafe";

import { SplitViewCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

fixture("SplitView").page("http://localhost:6060/#/SplitView");

test("should render structure correctly and defaults details view to sticky", async (t) => {
  const selector = Selector(toTestSelector("SplitView-scenario-standard"));
  const splitView = new SplitViewCtrl(selector, t);

  await splitView.expectContentAndDetailsView();
  await splitView.expectSticky(true);
});

test("details view size is correct", async (t) => {
  const selector = Selector(toTestSelector("SplitView-scenario-size"));

  const large = Selector(selector.find(toTestSelector("large")));
  const largeSplitView = new SplitViewCtrl(large, t);
  await largeSplitView.expectDetailsViewSize(EStandardSizes.Large);

  const medium = Selector(selector.find(toTestSelector("medium")));
  const mediumSplitView = new SplitViewCtrl(medium, t);
  await mediumSplitView.expectDetailsViewSize(EStandardSizes.Medium);

  const small = Selector(selector.find(toTestSelector("small")));
  const smallSplitView = new SplitViewCtrl(small, t);
  await smallSplitView.expectDetailsViewSize(EStandardSizes.Small);

  const extraSmall = Selector(selector.find(toTestSelector("extra-small")));
  const extraSmallSplitView = new SplitViewCtrl(extraSmall, t);
  await extraSmallSplitView.expectDetailsViewSize(EStandardSizes.ExtraSmall);
});

test("details view is not sticky", async (t) => {
  const selector = Selector(toTestSelector("SplitView-scenario-notSticky"));
  const splitView = new SplitViewCtrl(selector, t);

  await splitView.expectSticky(false);
});

test("content view alignment is correct", async (t) => {
  const selector = Selector(toTestSelector("SplitView-scenario-alignment"));

  const large = Selector(selector.find(toTestSelector("left")));
  const largeSplitView = new SplitViewCtrl(large, t);
  await largeSplitView.expectContentViewAlignment(THorizontalPositions.Left);

  const medium = Selector(selector.find(toTestSelector("center")));
  const mediumSplitView = new SplitViewCtrl(medium, t);
  await mediumSplitView.expectContentViewAlignment(THorizontalPositions.Center);

  const small = Selector(selector.find(toTestSelector("right")));
  const smallSplitView = new SplitViewCtrl(small, t);
  await smallSplitView.expectContentViewAlignment(THorizontalPositions.Right);
});
