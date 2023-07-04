import * as React from "react";
import { useCallback, useState } from "react";

import { Scope } from "next-shared/src/models/Scope";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EhrPatient } from "next-shared/src/models/EhrPatient";

import { useClient } from "../../../hooks/useClient";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../../structure/Table";
import { AltButton, Button } from "../../generic/Button";
import { useAssignPatientToScope } from "../../../hooks/useAssignPatientToScope";
import { useRemovePatientFromScope } from "../../../hooks/useRemovePatientFromScope";
import { Badge } from "../../generic/Badge";
import { HStack, Solid } from "../../structure/HStack";
import { useAssignStaffMemberToScope } from "../../../hooks/useAssignStaffMemberToScope";
import { useRemoveStaffMemberFromScope } from "../../../hooks/useRemoveStaffMemberFromScope";
import { Icon } from "../../generic/Icon";
import { FormSelectorModal } from "../../modals/FormSelectorModal";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

import styles from "./NextScopesTable.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NextScopesTable");

interface INextScopesTableRowProps {
  scope: Scope;
  patientId?: string;
  generateDetailsPath?: (path: string) => string;
  canAssign?: (ehrPatient: EhrPatient, scope: Scope) => boolean;
  hideFormAssign?: boolean;
}

const NextScopesTableRow: React.FC<INextScopesTableRowProps> = ({
  scope,
  generateDetailsPath,
  canAssign = (ehrPatient, scope) => !scope.ehrPatient,
  hideFormAssign = false,
}) => {
  const client = useClient();
  // the active patient, if applicable
  const { ehrPatient } = useSyncedSessionData();
  const staffMember = client.auth.session.staffMember;

  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const {
    // assignPatientIsError,
    // assignPatientIsLoading,
    assignPatient,
  } = useAssignPatientToScope(scope.scopeId, ehrPatient?.ehrPatientId);

  const {
    // removePatientIsError,
    // removePatientIsLoading,
    removePatient,
  } = useRemovePatientFromScope(scope.scopeId);

  const {
    // assignStaffMemberIsError,
    // assignStaffMemberIsLoading,
    assignStaffMember,
  } = useAssignStaffMemberToScope(scope.scopeId, staffMember?.staffMemberId);

  const {
    // removeStaffMemberIsError,
    // removeStaffMemberIsLoading,
    removeStaffMember,
  } = useRemoveStaffMemberFromScope(scope.scopeId);

  const assignToScope = useCallback(async () => {
    // weird race condition in services causes this to crash if both operations are done at the same time
    if (scope.type === "room") {
      await assignStaffMember();
    }
    await assignPatient();
  }, [assignPatient, assignStaffMember]);

  const removeFromScope = useCallback(async () => {
    // weird race condition in services causes this to crash if both operations are done at the same time
    await removePatient();
    if (scope.staffMember) {
      await removeStaffMember();
    }
  }, [scope, removePatient, removeStaffMember]);

  const staffMemberId = client.auth.session?.staffMemberId || null;

  return (
    <TableRow>
      <TableCell>
        {!!scope.hexColor && (
          <>
            <Badge hexColor={scope.hexColor}>
              <Icon name="chevron-right" />
            </Badge>{" "}
          </>
        )}
        {scope.label}
        {scope.staffMemberId && scope.staffMemberId === staffMemberId && (
          <span className={css("youIndicator")}>
            <Badge variant={TColorVariants.Info}>You</Badge>
          </span>
        )}
      </TableCell>
      <TableCell>{scope.getPatientLabel()}</TableCell>
      <TableCell>{scope.getScopeSummary()}</TableCell>
      <TableCell>
        <HStack size={EStandardSizes.ExtraSmall}>
          {!!scope.ehrPatient ? (
            <AltButton
              size={EStandardSizes.Small}
              onClick={removeFromScope}
              isBlock={true}
            >
              Remove
            </AltButton>
          ) : (
            <Button
              size={EStandardSizes.Small}
              onClick={assignToScope}
              disabled={!ehrPatient || !canAssign(ehrPatient, scope)}
              isBlock={true}
            >
              Set patient
            </Button>
          )}
          {!hideFormAssign && (
            <Button
              size={EStandardSizes.Small}
              onClick={() => setIsFormModalOpen(true)}
              disabled={false}
              isBlock={true}
            >
              Form...
            </Button>
          )}
          {!!generateDetailsPath && (
            <Solid>
              <Button
                size={EStandardSizes.Small}
                to={generateDetailsPath(scope.scopeId)}
              >
                ...
              </Button>
            </Solid>
          )}
          {isFormModalOpen && (
            <FormSelectorModal
              close={() => setIsFormModalOpen(false)}
              scope={scope}
            />
          )}
        </HStack>
      </TableCell>
    </TableRow>
  );
};

export interface INextScopesTableProps {
  scopes: Scope[];
  generateDetailsPath?: (path: string) => string;
  canAssign?: (ehrPatient: EhrPatient, scope: Scope) => boolean;
  hideFormAssign?: boolean;
}

export const NextScopesTable: React.FC<INextScopesTableProps> = ({
  scopes,
  generateDetailsPath,
  canAssign,
  hideFormAssign = false,
}) => {
  return (
    <Table type="pinStripe" sizing="compact" preset="scopes">
      <TableHeader>
        <TableRow>
          <TableHeaderCell width="20%">Name</TableHeaderCell>
          <TableHeaderCell width="30%">Patient</TableHeaderCell>
          <TableHeaderCell width="20%">Status</TableHeaderCell>
          <TableHeaderCell width="20%">Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(scopes || []).map((s) => (
          <NextScopesTableRow
            scope={s}
            key={s.scopeId}
            generateDetailsPath={generateDetailsPath}
            canAssign={canAssign}
            hideFormAssign={hideFormAssign}
          />
        ))}
      </TableBody>
    </Table>
  );
};
