import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { get } from "lodash";

import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";
import { fhirUtil } from "next-shared/src/fhirUtil";

import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { VStack } from "../../structure/VStack";

import { MatchingPatientResultHandler } from "../MatchingPatientResultHandler";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { BookingOption, BookingOptions } from "../BookingOptions";
import {
  BookingSection,
  BookingSectionFooter,
  BookingSectionTitle,
} from "../BookingSection";
import { PatientLogin } from "../../atoms/PatientLogin";
import { PatientCard } from "../../resources/PatientCard";
import {
  IPatientBasicsFormData,
  PatientBasicsForm,
} from "../PatientBasicsForm";
import { SupplementaryDetailsForm } from "../SupplementaryDetailsForm";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { EInclude, IPersonalDetails } from "../../../types/IPersonalDetails";
import { PatientBookingForSelfOptions } from "../PatientBookingForSelfOptions";

export interface IAppointmentPersonalsProps {}

/**
 * Collect the patient details based on session and appointment participant.
 */
export const AppointmentPersonals: React.FC<
  IAppointmentPersonalsProps
> = ({}) => {
  const client = useClient();
  const session = useMemo(() => client.auth.session, [client.auth.session]);

  const {
    location,
    hcp,
    slot,
    setStage,
    setPatient,
    patient,
    patientType,
    patientBookingForSelf,
    setPatientBookingForSelf,
    guestMode,
    appointmentType,
    updatePersonals,
    completePersonalsSection,
  } = useRequiredContext(BookingContext);

  // a matching patient that we will ask the user to log in as if possible
  const [pendingPatient, setPendingPatient] = useState<fhir3.Patient>(null);

  const [hasAppAccount, setHasAppAccount] = useState<null | boolean>(null);

  const [matchResult, setMatchResult] =
    useState<ICheckForMatchingPatientResult>();

  const checkForMatch = async (formData: IPatientBasicsFormData) => {
    // early exit if booking for other or if skipping account creation (proceeding as guest)
    if (
      patientBookingForSelf === false ||
      !formData.createAccount ||
      guestMode === true
    ) {
      setPendingPatient(null);
      setPatient(formData.Patient);
      return;
    }

    // check if the patient exists
    // HACK deliberately allows the error to propagate so that the form can handle it
    const result = await client.bookings.checkForMatchingPatient(
      formData.Patient,
    );

    if (!result) {
      return false;
    }

    setPendingPatient(formData.Patient);
    setMatchResult(result);
  };

  const showForSelf = patientBookingForSelf === null;

  const askIfExisting =
    patientBookingForSelf === true &&
    patientType !== "new" &&
    !session &&
    !guestMode;

  // if it's for me and there is no session and I have an account
  const showLoginForm =
    patientBookingForSelf === true && !session && hasAppAccount;

  // we want to collect for someone and don't have a patient yet
  const showFormForYouNew =
    patientBookingForSelf === true &&
    !guestMode &&
    (patientType === "new" || hasAppAccount === false);

  const showFormForGuest = patientBookingForSelf === false || guestMode;

  const showForm = !patient && (showFormForYouNew || showFormForGuest);

  const showDemographics = !!patient;

  // only show option to create an account if showing form for self
  const showCreateAccountOption = showFormForYouNew;

  const handleMatchingAccountSkip = useCallback(() => {
    // if skipped, use the fhir patient submitted from the form
    // reset local match result state
    setPendingPatient(null);
    setMatchResult(null);
    setPatient(pendingPatient);
  }, [setPatient, pendingPatient, setStage]);

  const handleAuthenticated = useCallback(() => {
    // technically not needed, as the patient now has a valid session and is logged in
    // but in case they logout, cleanup local state
    setPendingPatient(null);
    setMatchResult(null);
    // stay in this section for extended patient info to be filled out
  }, []);

  const demographicsLabel =
    patient && patientType === "returning" && patientBookingForSelf
      ? `Welcome ${fhirUtil<FhirPatientUtil>(
          patient,
        ).getDisplayName()}. Please review
  your details`
      : `Please review ${patientBookingForSelf ? "your" : "their"} details`;

  const requiredPersonalDetails: IPersonalDetails = useMemo(() => {
    const include: IPersonalDetails = {
      medicare: undefined,
      emergencyContact: undefined,
      address: undefined,
    };

    if (!appointmentType) {
      return include;
    }

    if (appointmentType.supplementaryDetailsRequired) {
      // assume all and remove those that are already filled
      include.medicare = EInclude.Required;
      include.emergencyContact = EInclude.Required;
      include.address = EInclude.Required;

      if (patient) {
        const patientUtil = fhirUtil<FhirPatientUtil>(patient);

        if (patientUtil.getMedicareNumber()) {
          include.medicare = undefined;
        }
        if (get(patient, "contact.0.name.text")) {
          include.emergencyContact = undefined;
        }
        if (get(patient, "address.0.line")) {
          include.address = undefined;
        }
      }
    }
    return include;
  }, [patient, appointmentType]);

  const [completingSection, setCompletingSection] = useState(false);
  const [completionError, setCompletionError] = useState<Error>();

  // reset error state when switching patient type
  useEffect(() => setCompletionError(null), [patientType]);

  const completeSection = useCallback(
    async (updates?: fhir3.Patient) => {
      setCompletionError(null);
      setCompletingSection(true);

      try {
        await completePersonalsSection(updates);
      } catch (err) {
        setCompletionError(err);
      }

      setCompletingSection(false);
    },
    [completePersonalsSection],
  );

  // is at least one personal section on?
  const showSupplementaryDetailsForm =
    Object.values(requiredPersonalDetails).filter((n) => n).length > 0;

  // check the prerequesits are met
  if (!location || !hcp || !slot || !appointmentType) {
    return null;
  }

  return (
    <BookingSection>
      <LoadingBlock
        isLoading={completingSection}
        error={completionError}
        refetch={() => completeSection()}
      >
        <VStack>
          {showForSelf && (
            <PatientBookingForSelfOptions
              selected={patientBookingForSelf}
              onSelect={(x: boolean) => setPatientBookingForSelf(x)}
            />
          )}
          {askIfExisting && (
            <AppointmentPersonalsAccountOptions
              selected={hasAppAccount}
              onSelect={(v) => setHasAppAccount(v)}
            />
          )}
          {showLoginForm && (
            <BookingSection>
              <BookingSectionTitle>Login</BookingSectionTitle>
              <PatientLogin />
            </BookingSection>
          )}
          {showForm && (
            <BookingSection>
              <BookingSectionTitle>{`Please fill out ${
                patientBookingForSelf ? "your" : "their"
              } details`}</BookingSectionTitle>
              <PatientBasicsForm
                onSuccess={checkForMatch}
                showCreateAccount={showCreateAccountOption}
              />
            </BookingSection>
          )}
          {showDemographics && (
            <BookingSection>
              <BookingSectionTitle>{demographicsLabel}</BookingSectionTitle>
              <div style={{ padding: "30px 0" }}>
                <PatientCard
                  data={patient}
                  disableRemoteUpdate={true}
                  onSuccess={(data) => updatePersonals(data.Patient)}
                  hide={{
                    basics: true,
                    // hide the sections we added to the demographics form
                    address: !!requiredPersonalDetails.address,
                    emergencyContact:
                      !!requiredPersonalDetails.emergencyContact,
                    medicare: !!requiredPersonalDetails.medicare,
                  }}
                />
              </div>
              {showSupplementaryDetailsForm ? (
                <SupplementaryDetailsForm
                  include={requiredPersonalDetails}
                  onSubmit={completeSection}
                />
              ) : (
                <BookingSectionFooter
                  onAccept={() => completeSection()}
                  acceptLabel="Next"
                />
              )}
            </BookingSection>
          )}
        </VStack>
      </LoadingBlock>
      <MatchingPatientResultHandler
        result={matchResult}
        patient={pendingPatient}
        onCancel={() => setMatchResult(null)}
        onSkipAccountCreation={handleMatchingAccountSkip}
        onAuthenticated={handleAuthenticated}
      />
    </BookingSection>
  );
};

interface IAppointmentPersonalsAccountOptions {
  selected: null | boolean;
  onSelect: (s: boolean) => void;
}

const AppointmentPersonalsAccountOptions: React.FC<
  IAppointmentPersonalsAccountOptions
> = ({ selected, onSelect }) => {
  return (
    <BookingSection>
      <BookingSectionTitle>
        Are you an existing patient with an app login?
      </BookingSectionTitle>
      {/* TODO: replace with the Choice component */}
      <BookingOptions>
        <BookingOption
          onSelect={() => onSelect(true)}
          selected={selected === true}
        >
          Yes log me in
        </BookingOption>
        <BookingOption
          onSelect={() => onSelect(false)}
          selected={selected === false}
        >
          Not yet
        </BookingOption>
      </BookingOptions>
    </BookingSection>
  );
};
