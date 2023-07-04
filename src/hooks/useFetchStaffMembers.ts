import { useQuery, QueryResult } from "react-query";

import { useClient } from "../hooks/useClient";
import { NextClient } from "../client/NextClient";
import { StaffMember } from "next-shared/src/models/StaffMember";

export const useFetchStaffMembers = (): QueryResult<StaffMember[], Error> => {
  const client = useClient();
  return useQuery(
    "retrieveAllStaffMembers",
    () => client.staffMembers.retrieveAllStaffMembers(),
    {
      retry: false,
    },
  );
};
