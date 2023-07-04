import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { StreamViewCtrl } from "./index.ctrl";

fixture("StreamView").page("http://localhost:6060/#/StreamView");

/**
 * To test audio/video streams we need to run testcafe with a few extra cli parameters
 * testcafe --hostname localhost "chrome --use-fake-ui-for-media-stream --use-fake-device-for-media-stream" index.js
 * as seen in https://github.com/DevExpress/testcafe-examples/blob/master/detached-examples/mock-camera-microphone-access
 */

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/StreamView/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/StreamView/_tests/index.intg.ts
 * ```
 */
test("Video stream available and playing", async (t) => {
  const selector = Selector(selectDemo("StreamView", "standard"));

  const streamView = new StreamViewCtrl(selector.find(selectComponent()), t);

  await streamView.expectStream;
  await streamView.expectStreamToBePlaying;
});

test("Controls are visible", async (t) => {
  const selector = Selector(selectDemo("StreamView", "controls"));

  const streamView = new StreamViewCtrl(selector.find(selectComponent()), t);

  await streamView.expectControls;
});

test("Child stream available and playing", async (t) => {
  const selector = Selector(selectDemo("StreamView", "child-stream"));

  const streamView = new StreamViewCtrl(selector.find(selectComponent()), t);

  await streamView.expectChildStream;
  await streamView.expectChildStreamToBePlaying;
});
