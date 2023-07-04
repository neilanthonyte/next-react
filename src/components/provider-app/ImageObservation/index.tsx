import * as React from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

import { ImgBlock } from "../../generic/ImgBlock";
import {
  Resource,
  ResourceHeader,
  ResourceType,
  ResourceBody,
  ResourceContent,
  ResourceFooter,
  ResourceSource,
} from "../../generic/Resource";
import { useHcps } from "../../../hooks/content/useHcps";
import { deviceOptions } from "../types/deviceOptions";
import { humanDateTimeFormatCompact } from "../../../helpers/momentFormats";

export interface IImageObservationProps {
  observation: fhir3.Observation;
  signedUrl: string;
  url?: string;
}

/**
 * Renders an observation containing an image. This includes device images captured
 * via the provider app, such as skin and eye photos.
 */
export const ImageObservation: React.FC<IImageObservationProps> = ({
  observation: obs,
  signedUrl,
  url,
}) => {
  const { hcps } = useHcps();

  const observationUtil = fhirUtil<FhirObservationUtil>(obs);
  const authorId = observationUtil.getPerformerIds()?.[0];
  const author = (hcps || []).find((hcp) => authorId === hcp.hubId);
  const deviceType = observationUtil.observationDeviceType();
  const icon =
    deviceOptions.find((o) => o.label === deviceType)?.icon || "task-image";

  const modDate: number = observationUtil.getLastModified();
  const updateStr = `${deviceType}, ${moment
    .unix(modDate)
    .format(humanDateTimeFormatCompact)}`;

  return (
    <Resource key={obs.id} url={url}>
      <ResourceHeader icon={icon}>
        <ResourceType>{updateStr}</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          <ImgBlock
            src={signedUrl}
            style={{ height: "260px" }}
            variant="contain"
          />
        </ResourceContent>
      </ResourceBody>
      {!!author && (
        <ResourceFooter>
          <ResourceSource
            imageSrc={author.profileImage?.squareSmall}
            description={author.fhirDisplayName}
          />
        </ResourceFooter>
      )}
    </Resource>
  );
};
