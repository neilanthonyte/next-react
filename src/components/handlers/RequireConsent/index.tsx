import * as React from "react";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { useClient } from "../../../hooks/useClient";
import { Legals } from "../../generic/Legals";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../structure/Modal";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface ICollectConsentModalProps {
  open: boolean;
}

export const CollectConsentModal: React.FC<ICollectConsentModalProps> = ({
  open = false,
}) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();

  const [acceptLegals] = useMutation<void | Promise<void>, Error>(
    async () => {
      if (!nextPatient) {
        console.warn("No patient available");
        return;
      }
      const patientId = nextPatient.patientId;
      if (!patientId) {
        console.error("Unable to find patient");
        return;
      }

      return client.patients.acceptTerms(patientId);
    },
    {
      // HACK return a rejected promise for the button to show error state
      onError: () => Promise.reject(),
    },
  );

  const {
    data: legalContent,
    isLoading,
    isError,
    refetch,
  } = useQuery("requireConsent", () =>
    client.legals.retrieveTermsAndConditions(),
  );

  return (
    <Modal open={open} onClose={null} size={TDialogSizes.Medium}>
      <ModalHeader>Terms and conditions</ModalHeader>
      <ModalBody>
        <LoadingBlock isLoading={isLoading}>
          {isError && !legalContent && <ErrorPlaceholder retry={refetch} />}
          {legalContent && (
            <Legals lead={legalContent.lead} sections={legalContent.sections} />
          )}
        </LoadingBlock>
      </ModalBody>
      {!!legalContent && (
        <ModalFooter
          actions={[
            {
              label: "Accept",
              onClick: acceptLegals,
            },
          ]}
        />
      )}
    </Modal>
  );
};

export const RequireConsent: React.FC = ({ children }) => {
  const { nextPatient } = useSyncedSessionData();

  const hasAcceptedTerms = useMemo(
    () => !!nextPatient?.hasAcceptedLatestTerms,
    [nextPatient],
  );

  return (
    <>
      <CollectConsentModal open={!hasAcceptedTerms} />
      <LoadingBlock isLoading={!hasAcceptedTerms}>
        {hasAcceptedTerms && children}
      </LoadingBlock>
    </>
  );
};
