import moment from "moment-timezone";
import * as React from "react";
import { useMemo } from "react";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";
import { usePatientActions } from "../../../hooks/actions/usePatientActions";
import { BaseAction } from "../../generic/BaseAction";
import { VStack } from "../../structure/VStack";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface IPatientActionsListProps {
  patientId: string;
  options?: IRetrieveActionsOptions;
  filterToday?: boolean;
  filterByStaffMemberInScope?: boolean;
}

export const PatientActionsList: React.FC<IPatientActionsListProps> = ({
  patientId,
  options,
  filterToday = false,
  filterByStaffMemberInScope = false,
}) => {
  const { allActions } = usePatientActions(patientId, options);

  const { scope } = useSyncedSessionData();

  const visibleActions = useMemo(() => {
    let remainingActions = allActions || [];

    if (filterByStaffMemberInScope) {
      const staffMemberInScope = scope?.staffMemberId;

      // defaults to showing nothing if there's no current staff member in scope
      remainingActions = staffMemberInScope
        ? remainingActions.filter((a) => a.authorId === staffMemberInScope)
        : [];
    }

    if (filterToday) {
      remainingActions = remainingActions.filter((a) =>
        moment.unix(a.createdAt).isSame(new Date(), "day"),
      );
    }

    return remainingActions;
  }, [
    filterToday,
    filterByStaffMemberInScope,
    allActions,
    scope?.staffMemberId,
  ]);

  return (
    <VStack size="compact">
      {visibleActions.map((a) => (
        <BaseAction
          key={a.actionId}
          action={a.toBaseAction()}
          variant="patient"
          showCheck={true}
        />
      ))}
    </VStack>
  );
};
