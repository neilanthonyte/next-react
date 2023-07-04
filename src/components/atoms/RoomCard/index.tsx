import * as React from "react";

import { Card, CardBody } from "../../structure/Card";
import {
  Cell,
  CellDescription,
  CellType,
  CellHeader,
} from "../../structure/Cell";
import { Scope } from "next-shared/src/models/Scope";
import { MedicalStaffMember } from "next-shared/src/models/MedicalStaffMember";

export interface IRoomCard {
  scope: Scope;
}

/**
 * Displays key information relating to a room, onClick, this will take you through to `/scopes/:${scopeId}`
 */
export const RoomCard: React.FC<IRoomCard> = ({ scope }) => {
  return (
    <Card url={`system/scopes/${scope.scopeId}`}>
      <CardBody>
        <Cell isLead decorationIcon="room">
          <CellHeader>{scope.label}</CellHeader>
          <Cell>
            <CellType>Practitioner</CellType>
            <CellDescription>
              {(scope.staffMemberId &&
                scope.staffMember instanceof MedicalStaffMember &&
                scope.staffMember.getDisplayName()) ||
                "N/A"}
            </CellDescription>
          </Cell>
          <Cell>
            <CellType>Patient</CellType>
            <CellDescription>
              {(scope.patientId && scope.patient.getDisplayName()) || "N/A"}
            </CellDescription>
          </Cell>
        </Cell>
      </CardBody>
    </Card>
  );
};
