import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Scope } from "next-shared/src/models/Scope";

import { CreateRoomModal } from "../../modals/CreateRoomModal";
import {
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionBody,
} from "../../structure/PageSection";
import { NextScopesTable } from "../../atoms/NextScopesTable";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { nextSystemPaths } from "../../views/routes";
import { useSyncedScopesForLocation } from "../../../hooks/core/useSyncedScopesForLocation";
import { useClient } from "../../../hooks/useClient";

export interface IRoomsSectionProps {}
export interface IRoomsSectionInnerProps {}

export const RoomsSection: React.FC<IRoomsSectionInnerProps> = ({}) => {
  const history = useHistory();

  const client = useClient();
  const { rooms } = useSyncedScopesForLocation(client.auth.session?.locationId);
  const [showModal, setShowModal] = useState(false);

  const onDismiss = () => {
    setShowModal(false);
  };

  const onSuccess = (room: Scope) => {
    onDismiss();
    // auto show the companion details
    history.push(nextSystemPaths.generateSystemScopePath(room.scopeId));
  };

  const roomActions = [{ label: "Create", onClick: () => setShowModal(true) }];

  return (
    <>
      <CreateRoomModal
        open={showModal}
        onDismiss={onDismiss}
        onSuccess={onSuccess}
      />
      <PageSection>
        <PageSectionHeader actions={roomActions}>
          <PageSectionTitle>Rooms</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <NextScopesTable
            scopes={rooms}
            generateDetailsPath={(id) =>
              nextSystemPaths.generateSystemScopePath(id)
            }
            hideFormAssign={true}
          />
        </PageSectionBody>
      </PageSection>
    </>
  );
};
