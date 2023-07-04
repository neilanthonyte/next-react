import * as React from "react";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as uuid from "uuid";
import axios from "axios";
import { flatten } from "lodash";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { Patient } from "next-shared/src/models/Patient";
import { Scope } from "next-shared/src/models/Scope";
import { PatientMedicalResource } from "next-shared/src/types/types";

import {
  CameraUploadContext,
  ICameraUploadContextValue,
} from "../../../contexts/CameraUploadContext";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { delay } from "../../../helpers/delay";
import { usePatientImages } from "../../../hooks/patient/usePatientImages";
import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";

/**
 * Stores an observation and its related signed URL. Avoids multiple components
 * fetching the same signed URLs.
 */
interface IImageObservation {
  observation: fhir3.Observation;
  signedUrl: string;
}
interface IProviderAppContextValue {
  /** The rooms with the current provider and a patient */
  providerRooms: Scope[];
  /** The active patient - they must feature in one of the providerRooms */
  patient?: Patient;
  setPatient: (patient: Patient) => void;
  /** Device images for the current patient */
  images?: IImageObservation[];
  isLoadingImages?: boolean;
  refetchImages?: () => Promise<void | PatientMedicalResource[]>;
  /** Performs the upload and updates the observation list */
  capturePhoto: (device: string, image: string | Blob) => Promise<void>;
}

export const ProviderAppContext = createContext<IProviderAppContextValue>({
  providerRooms: undefined,
  setPatient: undefined,
  patient: undefined,
  images: undefined,
  isLoadingImages: undefined,
  refetchImages: undefined,
  capturePhoto: undefined,
});

export interface IProviderAppProviderProps {}

/**
 * Provides the app state for the ProviderApp, including selected patient
 * and device.
 */
export const ProviderAppProvider: React.FC<IProviderAppProviderProps> = ({
  children,
}) => {
  const client = useClient();
  const { rooms } = useSyncedScopesForLocation(client.auth.session?.locationId);
  const { config } = useRequiredContext(ConfigContext);

  const [patient, setPatient] = useState<Patient>(null);

  const staffId = client.auth.session?.staffMemberId;
  const patientId = patient?.patientId;

  const {
    imagesByDeviceType = {},
    signedImageUrls,
    isLoading: isLoadingImages,
    refetch: refetchImages,
  } = usePatientImages(patientId);

  // merge all images together for now
  const images = useMemo(() => {
    if (!imagesByDeviceType) return null;

    // create a flat set of images order by most recent first
    const images = flatten(Object.values(imagesByDeviceType))
      .filter((n) => n)
      .sort((obA, obB) => {
        const obsUtilA = fhirUtil<FhirObservationUtil>(obA);
        const obsUtilB = fhirUtil<FhirObservationUtil>(obB);
        return obsUtilB.getLastModified() - obsUtilA.getLastModified();
      });

    return images
      .map((obs) => {
        const obsUtil = fhirUtil<FhirObservationUtil>(obs);
        const fhirUrl = obsUtil.getImageUrl();

        if (!fhirUrl) return null;
        const signedUrl = signedImageUrls[fhirUrl];

        return {
          observation: obs,
          signedUrl,
        };
      })
      .filter((n) => n);
  }, [imagesByDeviceType, signedImageUrls]);

  useEffect(() => {
    console.warn("Require a staff session");
  }, [staffId]);

  // the rooms with this provider and a patient
  const providerRooms = useMemo(() => {
    if (!staffId || !rooms) {
      return null;
    }
    return rooms
      .filter((r: Scope) => r.staffMemberId === staffId)
      .filter((r: Scope) => r.patient);
  }, [staffId, rooms]);

  useEffect(() => {
    if (!patient) return;
    // ensure the patient is still in the room
    if (
      !providerRooms.find(
        (r: Scope) => r.patient?.patientId === patient.patientId,
      )
    ) {
      setPatient(null);
    }
  }, [providerRooms]);

  // uploads the photo
  const capturePhoto = useCallback(
    async (device: string, image: Blob | string): Promise<void> => {
      if (!patient) {
        console.warn("No patient available");
        return null;
      }

      const formData = new FormData();
      formData.append("photo", image, uuid.v4());

      // HACK preferable to not build all the details here
      const url: string = `${config.servicesUrl}practitioner-app/patients/${
        patient.patientId
      }/submit-image?device=${encodeURIComponent(device)}`;

      const headers = {
        Accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + client.auth.session.sessionId,
      };

      const response = await axios({
        url,
        method: "POST",
        headers,
        data: formData,
      });

      if (!response) {
        console.warn("Unable to upload");
        return;
      }
    },
    [patient, config?.servicesUrl],
  );

  const value = useMemo(
    () => ({
      patient,
      setPatient,
      providerRooms,
      images,
      isLoadingImages,
      refetchImages,
      capturePhoto,
    }),
    [patient, providerRooms, images, isLoadingImages, capturePhoto],
  );

  const CameraUploadContextValue: ICameraUploadContextValue = useMemo(
    () => ({
      getSignedImageUrl: async (fileKey: string) => {
        // sign observation images
        const signedUrl = await client.storage.getUrl(fileKey);
        return signedUrl;
      },
      getUploadDetails: async (uploadNameSpace, image) => {
        console.warn("See capture Photo instead");
        return null;
      },
    }),
    [],
  );

  return (
    <ProviderAppContext.Provider value={value}>
      <CameraUploadContext.Provider value={CameraUploadContextValue}>
        {children}
      </CameraUploadContext.Provider>
    </ProviderAppContext.Provider>
  );
};
