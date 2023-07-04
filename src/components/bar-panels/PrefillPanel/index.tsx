import * as React from "react";
import * as _ from "lodash";

import { PendingContent } from "../../structure/PendingContent";
import { usePager } from "../../../hooks/usePager";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { usePatientReviewItems } from "../../../hooks/patient/usePatientReviewItems";
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
import ObservationCard from "../../resources/ObservationCard";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

const ITEMS_PER_PAGE = 3;

export const PrefillPanel: React.FC = () => {
  const { nextPatient } = useSyncedSessionData();
  const { patientForms } = usePatientReviewItems({
    nextPatientId: nextPatient?.patientId,
  });

  const [Pager, prefillItems] = usePager(ITEMS_PER_PAGE, patientForms);

  return (
    <NextBarPanel>
      <NextBarPanelInfoPane>
        <NextBarPanelInfoPaneTitle>Prefill Items</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody>
          The items displayed here have been provided by the patient and can be
          used to prefill the appointment notes.
        </NextBarPanelInfoPaneBody>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <PendingContent check={!!prefillItems}>
          <NextBarContent>
            <NextBarContentBody>
              {prefillItems &&
                prefillItems.map((resource: fhir3.Observation) => (
                  <ObservationCard
                    data={resource}
                    key={resource.id}
                    showPrefillBadge={true}
                    variant={ELayoutVariant.Compact}
                  />
                ))}
              {_.times(
                (ITEMS_PER_PAGE -
                  (prefillItems && prefillItems.length % ITEMS_PER_PAGE)) %
                  ITEMS_PER_PAGE,
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
  );
};
