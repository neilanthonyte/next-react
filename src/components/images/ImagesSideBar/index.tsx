import * as React from "react";
import * as _ from "lodash";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

import { Grid } from "../../structure/Grid";
import {
  SideBar,
  SideBarBody,
  SideBarHeader,
  SideBarTitle,
} from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";
import { usePatientImages } from "../../../hooks/patient/usePatientImages";
import { ImageObservation } from "../../provider-app/ImageObservation";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface IImagesSideBarProps {}

export const ImagesSideBar: React.FC<IImagesSideBarProps> = () => {
  const { scope } = useSyncedSessionData();
  const { imagesByDeviceType, signedImageUrls, ...patientImagesRest } =
    usePatientImages(scope?.patientId);

  const check = imagesByDeviceType !== null;

  const getContents = () => {
    return Object.keys(imagesByDeviceType).map((deviceName: string) => {
      const deviceImages = _.sortBy(
        imagesByDeviceType[deviceName],
        (n) => -(fhirUtil(n) as FhirObservationUtil).getLastModified(),
      );
      return (
        <SideBarSection key={deviceName} isCollapsible>
          <SideBarSectionHeader>
            <SideBarSectionTitle>
              {_.capitalize(deviceName)}
            </SideBarSectionTitle>
          </SideBarSectionHeader>
          <SideBarSectionBody>
            <Grid>
              {deviceImages.map((image) => {
                const obsUtil = fhirUtil<FhirObservationUtil>(image);
                const fhirUrl = obsUtil.getImageUrl();
                if (!fhirUrl) {
                  return null;
                }
                const signedUrl = signedImageUrls[fhirUrl];
                const url = `/images/${deviceName}/${image.id}`;

                return (
                  <ImageObservation
                    key={image.id}
                    observation={image}
                    signedUrl={signedUrl}
                    url={url}
                  />
                );
              })}
            </Grid>
          </SideBarSectionBody>
        </SideBarSection>
      );
    });
  };

  return (
    <SideBar>
      <SideBarHeader>
        <SideBarTitle>Images</SideBarTitle>
      </SideBarHeader>
      <SideBarBody>
        <LoadingBlock {...patientImagesRest}>
          {check && getContents()}
        </LoadingBlock>
      </SideBarBody>
    </SideBar>
  );
};
