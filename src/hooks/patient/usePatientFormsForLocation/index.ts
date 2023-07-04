import { useQuery, QueryResult } from "react-query";

import { IFormSummary } from "next-shared/src/types/formTypes";
import { useClient } from "../../useClient";

/**
 * Hook returning a list of available forms to be assigned to a patient for a given location
 */
export const usePatientFormsForLocation = (
  locationSlug: string,
): QueryResult<IFormSummary[], Error> => {
  const client = useClient();
  return useQuery(
    ["retrievePatientFormsForLocation", locationSlug],
    () => client.forms.retrievePatientFormsForLocation(locationSlug),
    { enabled: !!locationSlug },
  );
};
