import { Selector, ClientFunction } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CameraCtrl } from "../../index.ctrl";

const isPhotoTaken = async (t: TestController) => {
  const { log } = await t.getBrowserConsoleMessages();
  return log.some((line) => line.includes("new image"));
};

fixture("Camera").page("http://localhost:6060/#/Camera");

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: false })(
  "Camera should display the custom feed, a take photo option and a switch camera option initially",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);
    await t.expect(await camera.exists()).ok();
    await t.expect(await camera.cameraFeedCustom.exists()).ok();
    await t.expect(await camera.cameraOptions.exists()).ok();
    await t.expect(await camera.cameraOptions.switchCameraExists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
  },
);

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: false })(
  "Camera should display the preview and confirmation options once a photo is captured",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    // before taking photo
    await t.expect(await camera.cameraPreview.exists()).notOk();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
    await t
      .expect(await camera.cameraOptions.optionConfirmPhotoExists())
      .notOk();

    await camera.cameraOptions.clickTakePhoto();

    // afer taking photo
    await t.expect(await camera.cameraPreview.exists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).notOk();
    await t.expect(await camera.cameraOptions.optionConfirmPhotoExists()).ok();
    await t.expect(await camera.cameraOptions.rejectPhotoExists()).ok();
    await t.expect(await camera.cameraOptions.acceptPhotoExists()).ok();
  },
);

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: false })(
  "Camera should display the feed and the initial options again and not invoke onPhotoTaken callback if the captured photo is rejected",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    await camera.cameraOptions.clickTakePhoto();
    await camera.cameraOptions.clickRejectPhoto();

    await t.expect(await camera.cameraFeedCustom.exists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
    await t.expect(await camera.cameraPreview.exists()).notOk();
    await t
      .expect(await camera.cameraOptions.optionConfirmPhotoExists())
      .notOk();

    await t.expect(await isPhotoTaken(t)).notOk();
  },
);

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: false })(
  "Camera should display the feed and the initial options again and invoke onPhotoTaken callback if the captured photo is accepted",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    await camera.cameraOptions.clickTakePhoto();
    await camera.cameraOptions.clickAcceptPhoto();

    await t.expect(await camera.cameraFeedCustom.exists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
    await t.expect(await camera.cameraPreview.exists()).notOk();
    await t
      .expect(await camera.cameraOptions.optionConfirmPhotoExists())
      .notOk();

    await t.expect(await isPhotoTaken(t)).ok();
  },
);

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: true })(
  "Fastshoot camera should invoke onPhotoTaken callback immediately without showing confirmation options once a photo is captured",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-fastshoot"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    await t.expect(await isPhotoTaken(t)).notOk();

    await camera.cameraOptions.clickTakePhoto();

    await t.expect(await camera.cameraFeedCustom.exists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
    await t.expect(await camera.cameraPreview.exists()).notOk();
    await t
      .expect(await camera.cameraOptions.optionConfirmPhotoExists())
      .notOk();

    await t.expect(await isPhotoTaken(t)).ok();
  },
);

test.meta({ mode: "custom", cameraPermission: "allow", fastshoot: true })(
  "Fastshoot camera should see the take photo button mode transit from ready to success and back to ready once a photo is captured",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-auto-fastshoot"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    await t.expect(await camera.cameraOptions.takePhoto.isMode("default")).ok();

    await camera.cameraOptions.clickTakePhoto();

    await t
      .expect(await camera.cameraOptions.takePhoto.isMode("default"))
      .notOk();
    await t.expect(await camera.cameraOptions.takePhoto.isMode("success")).ok();

    await t.wait(3000); // wait a moment to let button animation finish

    await t.expect(await camera.cameraOptions.takePhoto.isMode("default")).ok();
  },
);

test.meta({ mode: "native", cameraPermission: "allow" })(
  "Camera should have the hidden native feed, placeholder and a take photo option initially",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-native-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);

    await t.expect(await camera.cameraFeedNative.exists()).ok();
    await t.expect(await camera.cameraFeedPlaceholder.exists()).ok();
    await t.expect(await camera.cameraOptions.optionTakePhotoExists()).ok();
  },
);

test.meta({ mode: "native", cameraPermission: "allow" })(
  "Camera should invoke onPhotoTaken callback when a photo is chosen from the dialog",
  async (t) => {
    const scenario: Selector = Selector(
      toTestSelector("Camera-scenario-native-standard"),
    );
    const camera: CameraCtrl = new CameraCtrl(scenario, t);
    // as the native file selection dialog is suppressed by testcafe,
    // we have to emulate the file choosing proccess by:
    // first, setting a photo programmatically
    await camera.cameraFeedNative.setCapturedPhoto(0);
    // then, mimic opening of the dialog (though nothing would be shown)
    await camera.cameraOptions.clickTakePhoto();
    // finally, minic closing of the dialog
    await ClientFunction(() => window.dispatchEvent(new Event("focus")))();

    await t.wait(3000);

    await t.expect(await isPhotoTaken(t)).ok();
  },
);
