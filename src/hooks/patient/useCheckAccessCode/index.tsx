import { useQuery } from "react-query";

import { ICheckAccessCodeResponse } from "next-shared/src/types/ICheckAccessCodeResponse";

import { useClient } from "../../useClient";

/**
 * Checks the status of an access code to determine the best course of action.
 *
 * @param accessCode
 * @returns
 */
export const useCheckAccessCode = (accessCode: string) => {
  const client = useClient();

  return useQuery<ICheckAccessCodeResponse, Error>(
    ["checkAccessCode", accessCode],
    () => client.patientApp.checkAccessCode(accessCode),
    { enabled: !!accessCode },
  );
};
