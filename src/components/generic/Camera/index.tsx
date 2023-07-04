import * as React from "react";
import { createRef, useEffect, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import {
  CameraFeedCustom,
  ICameraFeedCustomImperativeMethods,
} from "./components/CameraFeedCustom";
import {
  CameraFeedNative,
  ICameraFeedNativeImperativeMethods,
} from "./components/CameraFeedNative";
import { CameraPreview } from "./components/CameraPreview";
import { CameraFeedPlaceholder } from "./components/CameraFeedPlaceholder";
import { Button } from "../Button";
import { Icon } from "../Icon";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { VStack } from "../../structure/VStack";
import { HStack } from "../../structure/HStack";
const css = cssComposer(styles, "Camera");

export type DataType = "blob" | "data64";
/**
 * User is the front camera
 * Environment is the rear camera.
 */
export type FacingMode = "user" | "environment";

export interface ICameraProps {
  /** Defaults to FALSE */
  isRoundStyle?: boolean;
  /** The width of the video stream */
  videoWidth?: number;
  /** The return type for the captured image */
  returnType: DataType;
  /** Which camera to use on the device */
  videoEnvironment: FacingMode;
  /**
   * Whether or not to ask for confirmation on the photo taken,
   * if this is set to true, when the user clicks "take photo", the camera will return with the image and then reset.
   */
  fastShoot?: boolean;
  /**
   * What mode to render the camera in.
   * Native will use the devices camera natively, and let the OS handle taking of the photo.
   * Custom will use the Custom Camera Feed, and essentially take the photo "inline.
   * Auto will first try to use custom, but default to native if the browser does not support it.
   *
   * It is advisable that you either set auto and support both views,
   * or pick native (as picking custom directly can mean that nothing will get rendered).
   */
  mode?: "native" | "custom" | "auto";
  /**
   * This function is called when the user has accepted the image and it is ready to be manipulated/uploaded.
   * The type of image will be of the specified return type.
   */
  onPhotoTaken: (image: string | Blob) => void;
  /**
   * What icon to display when the camera feed is in native mode
   */
  previewIcon?: string;
  captureLabel?: string;
}

/**
 * This component can have side effects related to the browser that it is being used on, known issues that can arise:
 * - WebKit:
 *  - If you are using a library that overwrites events, like "react-fastclick" or "fastclick",
 * this will affect how much WebKit trusts that event, and WebKit will not open the file dialog/native camera.
 */
export const Camera: React.FC<ICameraProps> = ({
  fastShoot,
  mode,
  returnType,
  videoEnvironment,
  videoWidth = 100,
  onPhotoTaken,
  isRoundStyle = false,
  previewIcon = "photo-solid",
  captureLabel = "Take photo",
}) => {
  const cameraFeedCustomRef = createRef<ICameraFeedCustomImperativeMethods>();
  const cameraFeedNativeRef = createRef<ICameraFeedNativeImperativeMethods>();

  const [facingMode, setFacingMode] = useState(videoEnvironment);
  const [errorRenderingCustomCamera, setErrorRenderingCustomCamera] =
    useState(false);
  const [image, setImage] = useState<string | Blob>(null); // content captured by camera.

  const browserSupportExists = !!window.navigator.mediaDevices;

  useEffect(() => {
    setFacingMode(videoEnvironment);
  }, [videoEnvironment]);

  const containerStyle = {
    height: videoWidth,
    width: videoWidth,
  };

  const getMode = (): "native" | "custom" => {
    // if native, always return native.
    if (mode === "native") {
      return "native";
    }
    // if auto, and either no browser support or permission denied, return native.
    if (
      mode === "auto" &&
      (!browserSupportExists || errorRenderingCustomCamera)
    ) {
      return "native";
    }
    // if not native or auto, return custom.
    if (mode === "custom") {
      return "custom";
    }
    // if auto, and both browser support and permissions expected, return custom.
    if (
      mode === "auto" &&
      !errorRenderingCustomCamera &&
      browserSupportExists
    ) {
      return "custom";
    }
  };

  const getFeed = () => {
    // there is an image, we don't want to show the feed.
    if (image !== null) {
      return null;
    }
    const feedMode = getMode();
    if (feedMode === "native") {
      return (
        <CameraFeedNative
          videoEnvironment={videoEnvironment}
          ref={cameraFeedNativeRef}
        />
      );
    }
    if (feedMode === "custom") {
      return (
        <div style={containerStyle}>
          <CameraFeedCustom
            onErrorRenderingCamera={() => setErrorRenderingCustomCamera(true)}
            facingMode={facingMode}
            ref={cameraFeedCustomRef}
            width={videoWidth}
            round={isRoundStyle}
          />
        </div>
      );
    }
  };

  const takePhotoClicked = async () => {
    let newImage: Blob | string;
    if (getMode() === "native") {
      newImage = await cameraFeedNativeRef.current.capturePhoto(returnType);
    } else {
      newImage = await cameraFeedCustomRef.current.capturePhoto(returnType);
    }
    /**
     * If fastshoot enabled, do not wait for user input, just call onChange method and reset state.
     * Otherwise ignore and let the user decide whether to accept or reject.
     *
     * If the camera is in native mode, they have already accepted the image using the native UI.
     */
    if (fastShoot || getMode() === "native") {
      if (newImage) {
        onPhotoTaken(newImage);
        setImage(null);
        // feedback to the click event target so that it can update its own state accordingly
        return newImage; // success
      } else {
        return null; // canncellation
      }
    }
    setImage(newImage);
    return newImage;
  };

  // HACK should be split into own components
  const cameraOptions = () => {
    const onPhotoRejected = () => {
      setImage(null);
    };

    const onPhotoAccepted = () => {
      onPhotoTaken(image);
      setImage(null);
    };

    const showToggleCamera = getMode() === "custom";

    const onCameraToggle = () => {
      setFacingMode(facingMode === "user" ? "environment" : "user");
    };

    if (!image) {
      return (
        <div className={css("options")} data-test="take-photo">
          <VStack>
            {showToggleCamera && (
              <div style={{ textAlign: "center" }}>
                <Icon
                  name="switch-camera"
                  size={EStandardSizes.Small}
                  onClick={onCameraToggle}
                />
              </div>
            )}
            <Button
              isBlock={true}
              onClick={takePhotoClicked}
              disableOnSuccess={false}
            >
              {captureLabel}
            </Button>
          </VStack>
        </div>
      );
    }
    return (
      <div className={css("options")} data-test="confirm-photo">
        <HStack>
          <Button
            icon="tick"
            size={EStandardSizes.Small}
            onClick={onPhotoAccepted}
          >
            Accept
          </Button>
          <Button
            icon="close-hollow"
            size={EStandardSizes.Small}
            onClick={onPhotoRejected}
          >
            Reject
          </Button>
        </HStack>
      </div>
    );
  };

  const cameraPreview = () => {
    if (getMode() === "native") {
      return (
        <div style={containerStyle}>
          <CameraFeedPlaceholder
            icon={previewIcon}
            onClick={takePhotoClicked}
            round={isRoundStyle}
          />
        </div>
      );
    }
    if (image === null) {
      return null;
    }
    return (
      <div style={containerStyle}>
        <CameraPreview image={image} round={isRoundStyle} />
      </div>
    );
  };

  return (
    <div className={css("")} data-test="camera">
      {getFeed()}
      {cameraPreview()}
      {cameraOptions()}
    </div>
  );
};
