import axios from "axios";
import * as React from "react";

import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { Camera, ICameraProps } from "../../generic/Camera";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { Disable } from "../../generic/Disable";
import { ProviderAppContext } from "../ProviderAppProvider";
import { deviceOptions } from "../types/deviceOptions";
const css = cssComposer(styles, "DeviceListView");

export interface IDeviceListViewProps {}

/**
 * Displays a list of medical devices.
 */
export const DeviceListView: React.FC<IDeviceListViewProps> = ({}) => {
  const { patient, capturePhoto } = useRequiredContext(ProviderAppContext);
  const noPatient = !patient;

  return (
    <Disable disabled={noPatient} message="Please select a patient">
      <div className={css("")}>
        {deviceOptions.map((d) => (
          <div className={css("item")} key={d.label}>
            <Camera
              mode="native"
              videoEnvironment="user"
              returnType="blob"
              captureLabel={d.label}
              previewIcon={d.icon}
              onPhotoTaken={async (image) => {
                return capturePhoto(d.label, image);
              }}
            />
          </div>
        ))}
      </div>
    </Disable>
  );
};
