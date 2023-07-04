import { useState, useEffect } from "react";
import * as _ from "lodash";

import { useClient } from "./useClient";

// HACK
const hubUrlPrefixHack = "http://nextpracticehealth.com/";

const checkIfPhotoExists = (patient: fhir3.Patient): boolean => {
  return patient && patient.photo && patient.photo[0] && patient.photo[0].url
    ? true
    : false;
};

export interface IUseGetPhotoUrlReturn {
  url: string | null;
  loading: boolean;
}

/**
 * A custom hook that uses the imageKey on the patient object to get a pre signed s3 image url.
 */
export const useGetPhotoUrl = (
  patient: fhir3.Patient,
): IUseGetPhotoUrlReturn => {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useClient();

  const patientUrl = _.get(patient, "photo[0].url", null);

  useEffect(() => {
    if (!checkIfPhotoExists(patient)) {
      return;
    }

    setUrl(null);
    setLoading(true);

    const imageKey = patient.photo[0].url.replace(hubUrlPrefixHack, "");

    /**
     * pre load the image, return the image url when it's loaded.
     * due to the nature of browsers, the image will only be cached and not reloaded if the "Cache-Control"
     * header is set to an appropriate value on the HTTP response.
     */
    const imageElement = new Image();
    imageElement.onload = function () {
      setUrl(imageElement.src);
      setLoading(false);
    };

    client.files
      .requestSignedFileUrl(imageKey)
      .then((imageUrl: string) => {
        imageElement.src = imageUrl;
      })
      .catch(console.error);
  }, [patientUrl]);

  if (!checkIfPhotoExists(patient)) {
    return {
      url: null,
      loading: false,
    };
  }

  return {
    url,
    loading,
  };
};
