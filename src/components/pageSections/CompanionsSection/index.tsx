import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionBody,
} from "../../structure/PageSection";
import { CreateCompanionModal } from "../../modals/CreateCompanionModal";
import { NextScopesTable } from "../../atoms/NextScopesTable";
import { App } from "next-shared/src/models/App";
import { nextSystemPaths } from "../../views/routes";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { useClient } from "../../../hooks/useClient";

export interface ICompanionsSectionProps {}

export const CompanionsSection: React.FC<ICompanionsSectionProps> = ({}) => {
  const history = useHistory();
  const client = useClient();
  const { companions } = useSyncedScopesForLocation(
    client.auth.session?.locationId,
  );

  const [showModal, setShowModal] = useState(false);

  const onDismiss = () => {
    setShowModal(false);
  };

  const onSuccess = (companion: App) => {
    onDismiss();
    // auto show the companion details
    history.push(nextSystemPaths.generateSystemScopePath(companion.scopeId));
  };

  const actions = [{ onClick: () => setShowModal(true), label: "Create" }];

  return (
    <>
      <CreateCompanionModal
        open={showModal}
        onDismiss={onDismiss}
        onSuccess={onSuccess}
      />
      <PageSection>
        <PageSectionHeader actions={actions}>
          <PageSectionTitle>Companions</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <NextScopesTable
            scopes={companions}
            generateDetailsPath={(id) =>
              nextSystemPaths.generateSystemScopePath(id)
            }
          />
        </PageSectionBody>
      </PageSection>
    </>
  );
};
