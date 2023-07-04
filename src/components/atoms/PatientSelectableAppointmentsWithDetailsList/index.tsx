import * as React from "react";
import { useCallback, useContext, useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import { isUpcoming } from "next-shared/src/helpers/isUpcoming";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";

import { ReviewContext } from "../../../contexts/ReviewContext";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { SelectableListWithDetail } from "../SelectableListWithDetail";
import { AppointmentCell } from "../../cells/AppointmentCell";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { useSyncedEhrPatientAppointments } from "../../../hooks/patient/useSyncedEhrPatientAppointments";
import { LoadingBlock } from "../../structure/LoadingBlock";
import {
  TabbedContent,
  TabbedContentPanel,
  TabbedContentPanels,
  TabbedContentTab,
  TabbedContentTabs,
} from "../../structure/TabbedContent";
import { AppointmentDetail } from "./AppointmentDetail";

export interface IPatientSelectableAppointmentsWithDetailsListProps {
  showReviewOnly?: boolean;
}

/**
 * Component rendering list of selectable appointments with related forms for the patient in session
 * Used for next practice staff and accesses review context if available for medical staff
 */
export const PatientSelectableAppointmentsWithDetailsList: React.FC<
  IPatientSelectableAppointmentsWithDetailsListProps
> = ({ showReviewOnly }) => {
  // for appointments, we use ehr patient as the fetch is done in the ehr
  const { ehrPatient } = useSyncedSessionData();

  const { transcribeResources } = useContext(ReviewContext);

  const { patientAppointments, ...patientAppointmentsRest } =
    useSyncedEhrPatientAppointments(
      ehrPatient?.association?.ehrId,
      ehrPatient?.association?.ehrPatientId,
    );

  const { upcomingAppointmentsWithDetails, pastAppointmentsWithDetails } =
    useMemo(() => {
      if (!patientAppointments?.all)
        return {
          upcomingAppointmentsWithDetails: [],
          pastAppointmentsWithDetails: [],
        };

      // we use all and split (rather than use past/today/upcoming) as this causes items to be repeated
      const chosenAppointments = patientAppointments.all;

      // if review only, show only appointment with pending review form
      const filtered = showReviewOnly
        ? chosenAppointments.filter(
            (x) =>
              !!x.forms?.length &&
              x.forms.filter((form) =>
                fhirUtil(form).isReviewItem(
                  ehrPatient?.association?.cmsLocationSlug,
                ),
              ),
          )
        : chosenAppointments;
      return {
        upcomingAppointmentsWithDetails: filtered.filter((appt) =>
          isUpcoming(appt.appointment.end),
        ),
        pastAppointmentsWithDetails: filtered.filter(
          (appt) => !isUpcoming(appt.appointment.end),
        ),
      };
    }, [patientAppointments]);

  const emptyMessage = "There are no appointment forms to review for today.";

  const handleRenderListItem = useCallback(
    (appointmentWithDetails: IAppointmentWithDetails) => {
      // forms includes all forms, transcribable and not
      const { appointment, forms, payment } = appointmentWithDetails;

      // forms that can be transcribed
      const transcribableForms = (forms || []).filter((form) => {
        const observationUtil = fhirUtil<FhirObservationUtil>(form);
        return observationUtil.isTranscribeItem();
      });

      const canTranscribe =
        !!transcribeResources && !!transcribableForms.length;
      const onTranscribe = canTranscribe
        ? () => transcribeResources(transcribableForms, appointment.id)
        : undefined;

      return (
        <AppointmentCell
          appointment={appointment}
          hasPresentationForm={forms?.length > 0}
          onTranscribe={onTranscribe}
          hasPayment={!!payment}
        />
      );
    },
    [transcribeResources],
  );

  const handleRenderSelectedItem = useCallback(
    (appointmentWithDetails: IAppointmentWithDetails) => (
      <AppointmentDetail appointmentWithDetails={appointmentWithDetails} />
    ),
    [],
  );

  return (
    <LoadingBlock {...patientAppointmentsRest}>
      <TabbedContent>
        <TabbedContentTabs>
          <TabbedContentTab label="Today / Upcoming" />
          <TabbedContentTab label="Historic" />
        </TabbedContentTabs>
        <TabbedContentPanels>
          <TabbedContentPanel>
            <SelectableListWithDetail
              data={upcomingAppointmentsWithDetails}
              renderListItem={handleRenderListItem}
              renderSelectedItem={handleRenderSelectedItem}
              renderEmptyListFallback={() => (
                <NoDataFallback message={emptyMessage} />
              )}
            />
          </TabbedContentPanel>
          <TabbedContentPanel>
            <SelectableListWithDetail
              data={pastAppointmentsWithDetails}
              renderListItem={handleRenderListItem}
              renderSelectedItem={handleRenderSelectedItem}
              renderEmptyListFallback={() => (
                <NoDataFallback message={emptyMessage} />
              )}
            />
          </TabbedContentPanel>
        </TabbedContentPanels>
      </TabbedContent>
    </LoadingBlock>
  );
};
