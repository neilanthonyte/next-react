import * as React from "react";
import { useState } from "react";
import * as _ from "lodash";

import { ELayoutVariant } from "next-shared/src/types/layouts";

import { PendingContent } from "../../structure/PendingContent";
import { CreatePatientNoteModal } from "../../modals/CreatePatientNoteModal";
import { usePager } from "../../../hooks/usePager";
import {
  NextBarContent,
  NextBarContentBody,
  NextBarContentFooter,
} from "../../bar/NextBarContent";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { usePatientActions } from "next-react/src/hooks/actions/usePatientActions";
import { InstructionResource } from "../../resources/InstructionResource";

const PAGE_SIZE = 3;

export const InstructionsPanel: React.FC = () => {
  // Instructions will be re-fetched automatically after we have patient synced resources handler
  const { nextPatient } = useSyncedSessionData();

  const { instructionActions } = usePatientActions(nextPatient?.patientId);
  // sort by creation date asc
  (instructionActions || []).sort((a, b) => b.createdAt - a.createdAt);

  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);

  const [Pager, instructions] = usePager(PAGE_SIZE, instructionActions);

  return (
    <>
      <NextBarPanel>
        <NextBarPanelInfoPane
          actions={[
            {
              label: "Add note",
              disabled: false,
              onClick: () => setShowCreateNoteModal(true),
            },
          ]}
        >
          <NextBarPanelInfoPaneTitle>Instructions</NextBarPanelInfoPaneTitle>
          <NextBarPanelInfoPaneBody>
            Send your patient instructions to help them remember key details.
            Please ensure the patient is actively using the patient app.
          </NextBarPanelInfoPaneBody>
        </NextBarPanelInfoPane>
        <NextBarPanelContentPane>
          <PendingContent check={!!instructions}>
            <NextBarContent>
              <NextBarContentBody>
                {instructions &&
                  instructions.map((note) => {
                    return (
                      <InstructionResource
                        variant={ELayoutVariant.Compact}
                        title={note.title}
                        key={note.actionId}
                        htmlMessage={note.resource.message}
                        lastUpdated={note.updatedAt || note.createdAt}
                      />
                    );
                  })}
                {_.times(
                  (PAGE_SIZE -
                    (instructions && instructions.length % PAGE_SIZE)) %
                    PAGE_SIZE,
                  () => (
                    <div></div>
                  ),
                )}
              </NextBarContentBody>
              <NextBarContentFooter>
                <Pager />
              </NextBarContentFooter>
            </NextBarContent>
          </PendingContent>
        </NextBarPanelContentPane>
      </NextBarPanel>
      {showCreateNoteModal && (
        <CreatePatientNoteModal
          patientName={nextPatient.getDisplayName()}
          close={() => setShowCreateNoteModal(false)}
        />
      )}
    </>
  );
};
