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

export interface ICompanionsWidgetProps {}

export const CompanionsWidget: React.FC<ICompanionsWidgetProps> = ({}) => {
  const client = useClient();
  const { companions } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );

  return (
    <Widget
      label="Companions"
      loading={companions === null}
      badge={companions && companions.length}
      toMore={nextSystemPaths.systemRoot + nextSystemPaths.systemScopes}
    >
      {companions && (
        <Table sizing="compact">
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Patient</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions.map((c) => (
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
