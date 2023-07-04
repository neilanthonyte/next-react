import * as React from "react";
import { useParams } from "react-router-dom";

import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";

import { ImgBlock } from "../../generic/ImgBlock";
import { usePatientImages } from "../../../hooks/patient/usePatientImages";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { LoadingBlock } from "../../structure/LoadingBlock";
const css = cssComposer(styles);

export interface IRouteParams {
  device: string;
  id: string;
}

// TODO: this still specifies valueAttachment, so it requires STU3 spec (fhir3 namespace). Consider
// moving this functionality to the media resource on r4 (fhir4) spec. Note valueAttachment may return
// in r5 (currently in draft).
export interface IReadyImageViewProps {
  imagesByDeviceType: { [deviceType: string]: fhir3.Observation[] };
  signedImageUrls: { [key: string]: string };
  deviceName: string;
  imageId: string;
}

export const ImageViewUnconnected: React.FC<IReadyImageViewProps> = ({
  deviceName,
  imageId,
  signedImageUrls,
  imagesByDeviceType,
}) => {
  const deviceImages = imagesByDeviceType[deviceName] || [];
  const image = deviceImages.find((img) => img.id === imageId);

  if (typeof image === "undefined") {
    return null;
  }

  const obsUtil = fhirUtil<FhirObservationUtil>(image);

  const fhirUrl = obsUtil.getImageUrl();
  if (!fhirUrl) {
    return null;
  }
  const src = signedImageUrls[fhirUrl];

  return (
    <div className={css("imageView")}>
      <ImgBlock
        src={src}
        variant="contain"
        className={css("imageView_image")}
      />
    </div>
  );
};

export interface IPendingImageViewProps {}

export const ImageView: React.FC<IPendingImageViewProps> = () => {
  const { scope } = useSyncedSessionData();
  const { imagesByDeviceType, signedImageUrls, ...patientImagesRest } =
    usePatientImages(scope?.patientId);
  const { device, id } = useParams<any>();

  return (
    <LoadingBlock {...patientImagesRest}>
      {!!imagesByDeviceType && (
        <ImageViewUnconnected
          imagesByDeviceType={imagesByDeviceType}
          signedImageUrls={signedImageUrls}
          deviceName={device}
          imageId={id}
        />
      )}
    </LoadingBlock>
  );
};
