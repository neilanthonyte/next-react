import * as React from "react";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

import { isUpcoming } from "next-shared/src/helpers/isUpcoming";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { usePatientAppointments } from "../../../hooks/patient/usePatientAppointments";
import { PatientForm } from "../../atoms/PatientForm";
import { Message, MessageBody, MessageTitle } from "../../generic/Message";
import { PatientAppointmentForm } from "../../modals/PatientAppointmentForm";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { useForm } from "../../../hooks/forms/useForm";

export interface IAppPatientFormViewProps {
  formSlug: string;
  successPath: string;
}

/**
 * Shows a form for an app session patient.
 */
export const AppPatientFormView: React.FC<IAppPatientFormViewProps> = ({
  formSlug,
  successPath,
}) => {
  const history = useHistory();
  const { nextPatient, ehrPatient, scope } = useSyncedSessionData();

  const onSuccess = useCallback(() => {
    history.push(successPath);
  }, []);

  const {
    patientAppointments: { todays },
    ...rest
  } = usePatientAppointments({ ehrPatientId: ehrPatient?.ehrPatientId });

  // HACK fetching to determine the type. Although it is fetched again in the sub-component
  // react-query should ensure the result is cached
  const {
    formSchema,
    errorFormSchema,
    isLoadingFormSchema,
    refetchFormSchema,
  } = useForm(formSlug);

  // pick the most appropriate form to allocate this
  const upcomingAppointment = (todays || []).filter((appt) =>
    isUpcoming(appt.appointment.end),
  );
  // next upcoming or the most recent otherwise
  const nextAppointment = upcomingAppointment.length
    ? upcomingAppointment[upcomingAppointment.length - 1]
    : todays?.[0];

  // HACK determine if it is reason for visit by looking for the coding in the transformers, e.g.
  // {
  //   "path": "observation:ReasonForVisit.extension",
  //   "filter": "url=http://nextpracticehealth.com/extension/observation/Age",
  //   "type": "arrayToField",
  //   "src": "valueString",
  //   "dest": "shared-presentation-form-age"
  // },
  const isReasonForVisit = useMemo(
    () =>
      !!formSchema?.transformers?.find((t) =>
        t.path.startsWith("observation:ReasonForVisit"),
      ),
    [formSchema],
  );

  // determine if it saved against the appointment or the patient's observations
  const isPatientForm = nextPatient && !isReasonForVisit;

  return (
    <PageSection>
      <PageSectionBody>
        <LoadingBlock
          isLoading={isLoadingFormSchema}
          error={errorFormSchema}
          refetch={refetchFormSchema}
        >
          {!!formSchema && (
            <>
              {isPatientForm ? (
                <PatientForm onSuccess={onSuccess} formSlug={formSlug} />
              ) : (
                <LoadingBlock {...rest}>
                  {nextAppointment ? (
                    <PatientAppointmentForm
                      formSlug={formSlug}
                      appointmentId={nextAppointment.appointment.id}
                      ehrId={scope.ehrId}
                      onSuccess={onSuccess}
                    />
                  ) : (
                    <Message>
                      <MessageTitle>
                        Unable to display the assigned form
                      </MessageTitle>
                      <MessageBody>
                        You do not have an appointment today, which is required
                        to complete the form. Please contact the clinic staff to
                        resolve this issue.
                      </MessageBody>
                    </Message>
                  )}
                </LoadingBlock>
              )}
            </>
          )}
        </LoadingBlock>
      </PageSectionBody>
    </PageSection>
  );
};
