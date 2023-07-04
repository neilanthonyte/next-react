import React, { useEffect, useState } from "react";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import { PatientActionsList } from ".";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export const DemoStandard = () => {
  const [filterByStaffMemberInScope, setFilterByStaffMemberInScope] =
    useState(false);
  const [filterToday, setFilterToday] = useState(false);

  const { setActions } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "PatientActionsList",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setActions([
      {
        action: () => setFilterToday(true),
        label: "Today",
      },
      {
        action: () => setFilterToday(false),
        label: "Any Date",
      },
      {
        action: () => setFilterByStaffMemberInScope(true),
        label: "Staff Member in Scope",
      },
      {
        action: () => setFilterByStaffMemberInScope(false),
        label: "Any Staff Member",
      },
    ]);
  }, [setActions]);

  const { nextPatient } = useSyncedSessionData();

  return (
    <PatientActionsList
      patientId={nextPatient?.patientId}
      filterToday={filterToday}
      filterByStaffMemberInScope={filterByStaffMemberInScope}
    />
  );
};
