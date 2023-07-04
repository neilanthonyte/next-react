import * as React from "react";
import { useContext } from "react";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { useClient } from "../../../hooks/useClient";

import { Widget } from "../../generic/Widget";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../../structure/Table";
import { nextSystemPaths } from "../../views/routes";

export interface IRoomsWidgetProps {}

export const RoomsWidget: React.FC<IRoomsWidgetProps> = ({}) => {
  const client = useClient();
  const { rooms } = useSyncedScopesForLocation(client.auth.session?.locationId);

  return (
    <Widget
      label="Rooms"
      loading={rooms === null}
      badge={rooms && rooms.length}
      toMore={nextSystemPaths.systemRoot + nextSystemPaths.systemScopes}
    >
      {rooms && (
        <Table sizing="compact">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Patient</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((c) => (
              <TableRow key={c.scopeId}>
                <TableCell>{c.label}</TableCell>
                <TableCell>{c.patient && c.patient.getDisplayName()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Widget>
  );
};
