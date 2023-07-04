import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { imageDeviceTypeExtentionUrl } from "next-shared/src/helpers/constants";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  MedicalResourceType,
  PatientMedicalResource,
} from "next-shared/src/types/types";

import { useClient } from "../../useClient";
import { IPatientRecordQuery } from "../../../types/TPatientRecord";
import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";

interface IPatientImages extends IPatientRecordQuery<PatientMedicalResource[]> {
  imagesByDeviceType: Record<string, fhir3.Observation[]> | null;
  signedImageUrls: Record<string, string>;
}

export const usePatientImages = (patientId: string): IPatientImages => {
  const client = useClient();

  const [signedImageUrls, setSignedImageUrls] = useState<
    Record<string, string>
  >({});

  const { patientAllMedicalResources } = useSyncedPatientMedicalResources(
    patientId,
    [MedicalResourceType.Image],
  );
  const patientImages = patientAllMedicalResources?.[MedicalResourceType.Image];

  const imagesByDeviceType = useMemo(() => {
    if (!patientImages || !patientId) return null;
    const groupedImages: Record<string, fhir3.Observation[]> = {};
    patientImages.forEach((image: fhir3.Observation) => {
      const deviceName =
        fhirUtil(image).getExtensionStringValue(imageDeviceTypeExtentionUrl) ||
        "Unknown device";
      if (groupedImages[deviceName]) {
        groupedImages[deviceName].push(image);
        return;
      }
      groupedImages[deviceName] = [image];
    });
    return groupedImages;
  }, [patientImages, patientId]);

  useEffect(() => {
    if (!patientImages || !patientId) return;
    const newerSignedImageUrls: Record<string, string> = {};
    (async () => {
      await Promise.all(
        patientImages.map(async (image: fhir3.Observation) => {
          const obsUtil = fhirUtil<FhirObservationUtil>(image);
          const fhirUrl = obsUtil.getImageUrl();

          if (!fhirUrl) {
            return null;
          }

          if (!(fhirUrl in signedImageUrls)) {
            const signedUrl = await client.storage
              .getUrl(fhirUrl)
              .catch((err) => console.error(err));
            if (!signedUrl) return;
            newerSignedImageUrls[fhirUrl] = signedUrl;
          }
        }),
      );
      if (Object.keys(newerSignedImageUrls).length > 0) {
        setSignedImageUrls((s) => ({ ...s, ...newerSignedImageUrls }));
      }
    })();
  }, [patientImages, patientId]);

  return useMemo<IPatientImages>(
    () => ({
      imagesByDeviceType,
      signedImageUrls,
      // HACK please fix
      isLoading: false,
      error: null,
      refetch: null,
    }),
    [imagesByDeviceType, signedImageUrls], //, isLoading, error, refetch],
  );
};
