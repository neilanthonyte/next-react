import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { StreamControlsCtrl } from "./index.ctrl";
import {
  EStreamControlsTestState,
  streamControlsInitialState,
} from "../readme";

fixture("StreamControls").page("http://localhost:6060/#/StreamControls");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/atoms/StreamControls/index.tsx yarn dev
 * yarn testcafe ./src/components/atoms/StreamControls/_tests/index.intg.ts
 * ```
 */
test("Video toggle callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialVideoState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Video),
  );
  await t
    .expect(initialVideoState)
    .eql(streamControlsInitialState.video.toString());

  await streamControls.clickVideoControl();

  const updatedVideoState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Video),
  );
  await t
    .expect(updatedVideoState)
    .eql((!streamControlsInitialState.video).toString());
});

test("Audio toggle callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialAudioState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Audio),
  );
  await t
    .expect(initialAudioState)
    .eql(streamControlsInitialState.audio.toString());

  await streamControls.clickAudioControl();

  const updatedAudioState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Audio),
  );
  await t
    .expect(updatedAudioState)
    .eql((!streamControlsInitialState.audio).toString());
});

test("Share screen toggle callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialScreenShareState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.ScreenShare),
  );
  await t
    .expect(initialScreenShareState)
    .eql(streamControlsInitialState.screenShare.toString());

  await streamControls.clickShareScreenControl();

  const updatedScreenShareState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.ScreenShare),
  );
  await t
    .expect(updatedScreenShareState)
    .eql((!streamControlsInitialState.screenShare).toString());
});

test("Toggle camera callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialToggleCameraState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Camera),
  );

  await t
    .expect(initialToggleCameraState)
    .eql(streamControlsInitialState.isFrontCamera.toString());

  await streamControls.clickToggleCameraControl();

  const updatedToggleCameraState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.Camera),
  );
  await t
    .expect(updatedToggleCameraState)
    .eql((!streamControlsInitialState.isFrontCamera).toString());
});

test("End stream callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialStreamEndedState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.StreamEnded),
  );

  await t
    .expect(initialStreamEndedState)
    .eql(streamControlsInitialState.streamEnded.toString());

  await streamControls.clickEndStreamControl();

  const updatedStreamEndedState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.StreamEnded),
  );
  await t
    .expect(updatedStreamEndedState)
    .eql((!streamControlsInitialState.streamEnded).toString());
});

test("Stream size callback", async (t) => {
  const selector = Selector(selectDemo("StreamControls", "standard"));

  const streamControls = new StreamControlsCtrl(
    selector.find(selectComponent()),
    t,
  );

  await streamControls.expectStreamControls;

  const initialStreamSizeState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.StreamSize),
  );

  await t
    .expect(initialStreamSizeState)
    .eql(streamControlsInitialState.isStreamExpanded.toString());

  await streamControls.clickStreamSizeControl();

  const updatedStreamSizeState = await selector.getAttribute(
    selectAttribute(EStreamControlsTestState.StreamSize),
  );
  await t
    .expect(updatedStreamSizeState)
    .eql((!streamControlsInitialState.isStreamExpanded).toString());
});
