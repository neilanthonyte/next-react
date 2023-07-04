import * as React from "react";
import { useCallback } from "react";
import { capitalize } from "lodash";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useClient } from "../../../hooks/useClient";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { Button } from "../../generic/Button";
import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";
import { nextBarEnvironments } from "../../../types/IBarEnvironment";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";

interface INextBarSettingsModalProps {
  open: boolean;
  onClose: () => unknown;
}

export const NextBarSettingsModal: React.FC<INextBarSettingsModalProps> = ({
  open,
  onClose,
}) => {
  const client = useClient();

  const { nextPatient, ehrPatient, scope } = useSyncedSessionData();
  const session = client.auth.session;

  const handleLogout = useCallback(() => {
    if (!confirm("Are you sure you want to log out?")) {
      return;
    }
    client.auth.logout().catch(console.error);
  }, []);

  const environment = localStorage.getItem("envName");

  return (
    <Modal open={open} onClose={onClose} size={TDialogSizes.Large}>
      <ModalHeader>Settings</ModalHeader>
      <ModalBody>
        <VStack>
          <VStack size="compact">
            <h4>Debug details</h4>
            <ul>
              <li>
                <label>Session:</label> {session?.sessionId}
              </li>
              <li>
                <label>Session staff:</label> {session?.staffMemberId}
              </li>
              <li>
                <label>App:</label> {session?.app?.appId}{" "}
                {session?.app && `(${session.app.label})`}
              </li>
              <li>
                <label>Scope:</label> {scope?.scopeId}{" "}
                {scope && `(${scope.label})`}
              </li>
              <li>
                <label>Scope staff:</label> {scope?.staffMemberId}
              </li>
              <li>
                <label>Scope Next patient:</label> {scope?.patientId}
              </li>
              <li>
                <label>Scope EHR patient:</label> {scope?.ehrPatientId}
                {scope?.ehrId && `(EHR: ${scope?.ehrId})`}
              </li>
              <li>
                <label>Next patient:</label> {nextPatient?.patientId}{" "}
                {nextPatient && `(${nextPatient?.getDisplayName()})`}
              </li>
              <li>
                <label>EHR patient:</label> {ehrPatient?.ehrPatientId}{" "}
                {ehrPatient && `(ALT ID: ${ehrPatient.ehrPatientIdAlt})`}
              </li>
            </ul>
          </VStack>
          <VStack size="compact">
            <h4>Environment</h4>
            <HStack>
              {nextBarEnvironments.map((e) => (
                <Button
                  onClick={() => {
                    localStorage.setItem("envName", e.name);
                    window.location.reload();
                  }}
                  variant={e.name === environment ? "primary" : "secondary"}
                  size={EStandardSizes.ExtraSmall}
                  key={e.name}
                >
                  {capitalize(e.name)}
                </Button>
              ))}
              <Button
                onClick={() => {
                  localStorage.removeItem("envName");
                  window.location.reload();
                }}
                disabled={!environment}
                size={EStandardSizes.ExtraSmall}
                status={TColorVariants.Danger}
              >
                Clear
              </Button>
            </HStack>
          </VStack>
          <hr />
          <VStack size="compact">
            <Button
              onClick={handleLogout}
              size={EStandardSizes.Small}
              status={TColorVariants.Danger}
            >
              Log out
            </Button>
          </VStack>
        </VStack>
      </ModalBody>
    </Modal>
  );
};
