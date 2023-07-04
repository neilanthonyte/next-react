import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CameraCtrl } from "../../index.ctrl";

fixture("Camera").page("http://localhost:6060/#/Camera");

test("Camera should always render camera options", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Camera-scenario-auto-standard"),
  );
  const camera: CameraCtrl = new CameraCtrl(scenario, t);
  await t.expect(await camera.exists()).ok();
  await t.expect(await camera.cameraOptions.exists()).ok();
});

test("Camera should not render the switch camera option if the mode is custom and camera permission is blocked", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Camera-scenario-auto-standard"),
  );
  const camera: CameraCtrl = new CameraCtrl(scenario, t);
  await t.expect(await camera.exists()).ok();
  await t.expect(await camera.cameraOptions.exists()).ok();
  await t.expect(await camera.cameraOptions.switchCameraExists()).notOk();
});

test("Camera should render the camera placeholder in round style when set so", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Camera-scenario-round-placeholder"),
  );
  const camera: CameraCtrl = new CameraCtrl(scenario, t);
  await t.expect(await camera.cameraFeedPlaceholder.isRound()).ok();
});

test("Camera should not render any feed, preview or placeholder when mode is set to custom and camera permission is blocked", async (t) => {
  const scenario: Selector = Selector(
    toTestSelector("Camera-scenario-round-preview"),
  );
  const camera: CameraCtrl = new CameraCtrl(scenario, t);
  await t.expect(await camera.exists()).ok();
  await t.expect(await camera.cameraFeedCustom.exists()).notOk();
  await t.expect(await camera.cameraFeedNative.exists()).notOk();
  await t.expect(await camera.cameraPreview.exists()).notOk();
  await t.expect(await camera.cameraFeedPlaceholder.exists()).notOk();
});
