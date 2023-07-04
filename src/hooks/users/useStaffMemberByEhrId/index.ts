import { StaffMember } from "next-shared/src/models/StaffMember";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useClient } from "../../useClient";

interface IUseStaffMemberByEhrId {
  staffMember: StaffMember;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<StaffMember>;
}

/**
 * Fetch a staff member for a given ID.
 */
export const useStaffMemberByEhrId = (
  helixId: string,
): IUseStaffMemberByEhrId => {
  const client = useClient();

  const {
    data: staffMember,
    error,
    isLoading,
    refetch,
  } = useQuery<StaffMember, Error>(
    ["staffMemberByEhrId", helixId],
    async () => {
      const staffMember = await client.staffMembers.retrieveStaffMemberByEhrId(
        helixId,
      );

      if (!staffMember) {
        console.error(`Unable to find staff member: '${helixId}'`);
      } else {
        return staffMember;
      }
    },
    { refetchOnMount: false, enabled: !!helixId },
  );

  return useMemo<IUseStaffMemberByEhrId>(
    () => ({
      staffMember,
      error,
      isLoading,
      refetch,
    }),
    [staffMember, error, isLoading, refetch],
  );
};
