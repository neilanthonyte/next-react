import * as React from "react";

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableHeaderCell,
} from "../../structure/Table";
import { Disable } from "../../generic/Disable";
import { Button } from "../../generic/Button";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { useFetchStaffMembers } from "../../../hooks/useFetchStaffMembers";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { useHcps } from "../../../hooks/content/useHcps";

export interface IStaffMembersTableProps {}

export const StaffMembersTable: React.FC<IStaffMembersTableProps> = ({}) => {
  const { data: staffMembers } = useFetchStaffMembers();
  const { hcps } = useHcps();

  return (
    <Disable disabled={staffMembers === null}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Next ID</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(staffMembers || []).map((staff: StaffMember) => {
            const hcp = (hcps || []).find(
              (h) => h.npServicesId === staff.staffMemberId,
            );
            return (
              <TableRow key={staff.staffMemberId}>
                <TableCell>{hcp ? hcp.fhirDisplayName : staff.email}</TableCell>
                <TableCell>{staff.staffMemberId}</TableCell>
                <TableCell>
                  <Button
                    size={EStandardSizes.Small}
                    to={`/admin/users/${staff.staffMemberId}`}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Disable>
  );
};
