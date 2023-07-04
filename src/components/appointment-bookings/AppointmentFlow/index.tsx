import * as React from "react";
import { useMemo, useState } from "react";

import { Flow, FlowStep } from "../../structure/Flow";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { useClient } from "../../../hooks/useClient";
import { EAppointmentStepIcons } from "../../../helpers/stepIcons";
import { CovidSymptomsPrompt } from "../CovidSymptomsPrompt";
import { AppointmentPersonals } from "../AppointmentPersonals";
import { AppointmentPresentation } from "../AppointmentPresentation";
import { AppointmentConfirmAndProcess } from "../AppointmentConfirmAndProcess";
import { AppointmentOtherConcerns } from "../AppointmentOtherConcerns";
import { PatientLoginModal } from "../../modals/PatientLoginModal";
import { PatientLogOutModal } from "../../modals/PatientLogOutModal";
import { ApppointmentSlotCalendar } from "../AppointmentSlotCalendar";
import { AppointmentLocations } from "./components/AppointmentLocations";
import { AppointmentTypeAndHcpSelection } from "./components/AppointmentTypeAndHcpSelection";
import { BookingPayment } from "../BookingPayment";

const Narrow: React.FC = ({ children }) => (
  <div style={{ maxWidth: "600px", margin: "auto" }}>{children}</div>
);

export interface IAppointmentFlowProps {
  allowLogin?: boolean;
  allowEdit?: boolean; // TODO remove this prop (it's been removed in the single-EHR version)
}

/**
 * High level component handling the booking flow in all its steps
 */
export const AppointmentFlow: React.FC<IAppointmentFlowProps> = ({
  allowLogin = true,
}) => {
  const client = useClient();
  const {
    hide,
    clearLocation,
    clearHcp,
    clearAppointmentType,
    clearSlot,
    stage,
    setStage,
    setPresentationFormResponse,
    location: loc,
    appointmentType,
  } = useRequiredContext(BookingContext);

  const editLabel = "Change";
  const editActions = useMemo(
    () => ({
      location: { label: editLabel, onClick: clearLocation },
      hcpAndType: {
        label: editLabel,
        onClick: () => {
          clearAppointmentType();
          clearHcp();
        },
      },
      otherConcerns: {
        label: editLabel,
        onClick: () => {
          setStage(BOOKING_STAGES.OtherConcerns);
          clearSlot();
        },
      },
      time: { label: editLabel, onClick: clearSlot },
      personal: {
        label: editLabel,
        onClick: () => setStage(BOOKING_STAGES.Personals),
      },
      presentation: {
        label: editLabel,
        onClick: () => setStage(BOOKING_STAGES.Presentation),
      },
      // prevent navigation to payment section if appointment is bulk billed
      payment: appointmentType?.isBulkBilled()
        ? undefined
        : {
            label: editLabel,
            onClick: () => setStage(BOOKING_STAGES.Payment),
          },
    }),
    [appointmentType],
  );

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);

  const isLoggedIn = useMemo(
    () => client.auth.session && client.auth.session.id,
    [client.auth.session],
  );
  const actions = useMemo(() => {
    if (!allowLogin) return [];
    return isLoggedIn
      ? [{ label: "Log out", onClick: () => setLogOutModal(true) }]
      : [{ label: "Log in", onClick: () => setLoginModal(true) }];
  }, [isLoggedIn]);

  const closeLogOutModal = () => setLogOutModal(false);
  const logOut = () => {
    client.auth.logout();
    closeLogOutModal();
  };

  const steps: number[] = useMemo(() => {
    const buildSteps = [];
    if (!hide.location) {
      buildSteps.push(BOOKING_STAGES.Location);
    }
    if (!hide.appointmentType) {
      buildSteps.push(BOOKING_STAGES.Type);
    }

    if (loc && loc.bookingFeatureTimingOverridesEnabled) {
      buildSteps.push(BOOKING_STAGES.OtherConcerns);
    }
    buildSteps.push(BOOKING_STAGES.Time);

    // add the default steps
    buildSteps.push(BOOKING_STAGES.Personals);
    buildSteps.push(BOOKING_STAGES.Presentation);
    buildSteps.push(BOOKING_STAGES.Payment);
    buildSteps.push(BOOKING_STAGES.Review);

    return buildSteps;
  }, [hide, loc]);

  const skipPresentationForm = () => {
    setPresentationFormResponse(null);
    if (appointmentType?.isBulkBilled()) {
      setStage(BOOKING_STAGES.Review);
    } else {
      setStage(BOOKING_STAGES.Payment);
    }
  };

  // collapse the latter steps together
  const _stage =
    stage === BOOKING_STAGES.Processing || stage === BOOKING_STAGES.Complete
      ? BOOKING_STAGES.Review
      : stage;
  const step = steps.indexOf(_stage);
  const isPending = step <= steps.indexOf(BOOKING_STAGES.Review);

  return (
    <PageSection>
      <PageSectionHeader actions={actions}>
        <PageSectionTitle>Book an appointment</PageSectionTitle>
      </PageSectionHeader>
      <PageSectionBody>
        <CovidSymptomsPrompt>
          <Flow step={step}>
            {steps.includes(BOOKING_STAGES.Location) && (
              <FlowStep
                title="Location"
                icon={EAppointmentStepIcons.Location}
                edit={isPending && editActions.location}
              >
                <AppointmentLocations />
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.Type) && (
              <FlowStep
                title="Appointment type"
                icon={EAppointmentStepIcons.AppointmentType}
                edit={isPending && editActions.hcpAndType}
              >
                <AppointmentTypeAndHcpSelection />
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.OtherConcerns) && (
              <FlowStep
                title="Other health concerns"
                icon={EAppointmentStepIcons.OtherConcerns}
                edit={isPending && editActions.otherConcerns}
              >
                <AppointmentOtherConcerns />
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.Time) && (
              <FlowStep
                title="Time of day"
                icon={EAppointmentStepIcons.Slot}
                edit={isPending && editActions.time}
              >
                <ApppointmentSlotCalendar />
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.Personals) && (
              <FlowStep
                title="Personal details"
                icon={EAppointmentStepIcons.Personals}
                edit={isPending && editActions.personal}
              >
                <Narrow>
                  <AppointmentPersonals />
                </Narrow>
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.Presentation) && (
              <FlowStep
                title="Reason for visit"
                icon={EAppointmentStepIcons.Presentation}
                edit={isPending && editActions.presentation}
              >
                <Narrow>
                  <AppointmentPresentation
                    onSuccess={setPresentationFormResponse}
                    onDismiss={skipPresentationForm}
                  />
                </Narrow>
              </FlowStep>
            )}
            {steps.includes(BOOKING_STAGES.Payment) && (
              <FlowStep
                title="Payment details"
                icon={EAppointmentStepIcons.Payment}
                edit={isPending && editActions.payment}
              >
                <Narrow>
                  <BookingPayment />
                </Narrow>
              </FlowStep>
            )}
            <FlowStep title="Review" icon={EAppointmentStepIcons.Review}>
              {/* TODO consider breaking up the below */}
              <Narrow>
                <AppointmentConfirmAndProcess />
              </Narrow>
            </FlowStep>
          </Flow>
        </CovidSymptomsPrompt>
        <PatientLoginModal
          open={loginModal}
          onClose={() => setLoginModal(false)}
        />
        <PatientLogOutModal
          open={logOutModal}
          onLogOut={logOut}
          onDismiss={closeLogOutModal}
        />
      </PageSectionBody>
    </PageSection>
  );
};
