import * as React from "react";
import { useState } from "react";

import { useGetPhotoUrl } from "next-react/src/hooks/useGetPhotoUrl";

import { Page, PageBody } from "../../structure/Page";
import {
  SlimSection,
  SlimSectionBody,
  SlimSectionHeader,
  SlimSectionTitle,
} from "../../structure/SlimSection";
import { PatientDemographics } from "../../atoms/PatientDemographics";
import {
  EPaymentDetailsPatientSource,
  PatientPaymentDetails,
} from "../../atoms/PatientPaymentsDetails";
import {
  PatientSectionForms,
  PatientSectionLifestyle,
} from "../../atoms/PatientSubmittedForms";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import { EhrPatientAppointments } from "../../atoms/EhrPatientAppointments";
import { VStack } from "../../structure/VStack";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { EhrPatientForm } from "../EhrPatientForm";
import { EInclude } from "../../../types/IPersonalDetails";
import { InfoMessage, MessageBody } from "../../generic/Message";
import { EColorScheme } from "next-shared/src/types/colorScheme";
import { TLayoutDirections } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { PatientSummary } from "../../atoms/PatientSummary";
import { AltButton } from "../../generic/Button";
import { PatientFormModal } from "../../modals/PatientFormModal";
import { useHistory } from "react-router-dom";

export interface ICompanionProfileViewProps {
  successPath?: string;
}

export const CompanionProfileView: React.FC<ICompanionProfileViewProps> = ({
  successPath,
}) => {
  const { nextPatient } = useSyncedSessionData();
  const history = useHistory();

  if (!nextPatient) {
    return (
      <Page>
        <PageBody>
          <SlimSection>
            <SlimSectionBody>
              <InfoMessage>
                <MessageBody>
                  Please note that you are only updating your details at this
                  clinic. We recommend creating a Next Practice account so that
                  you can keep your details up to date across all our clinics
                  from the comfort of your home.
                </MessageBody>
              </InfoMessage>
              <EhrPatientForm
                include={{
                  // basics: EInclude.Required, // should be filled
                  atsi: EInclude.Required,
                  // termsAndConditions: EInclude.Required,
                  address: EInclude.Optional,
                  emergencyContact: EInclude.Optional,
                  // profileImage: EInclude.Optional, // NOT supported
                  // payment: EInclude.Optional, // NOT supported
                  medicare: EInclude.Optional,
                  concession: EInclude.Optional,
                  dva: EInclude.Optional,
                }}
                onRecordUpdate={() => {
                  successPath && history.push(successPath);
                }}
              />
            </SlimSectionBody>
          </SlimSection>
        </PageBody>
      </Page>
    );
  }

  return (
    <>
      <Page>
        <PageBody>
          <SlimSection>
            <SlimSectionHeader>
              <SlimSectionTitle>
                <a id="appointments" />
                Appointments
              </SlimSectionTitle>
            </SlimSectionHeader>
            <SlimSectionBody>
              <EhrPatientAppointments />
            </SlimSectionBody>
          </SlimSection>
          <SlimSection>
            <SlimSectionHeader>
              <SlimSectionTitle>
                <a id="demographics" />
                Personal details
              </SlimSectionTitle>
            </SlimSectionHeader>
            <SlimSectionBody>
              <PatientProfileDemographics />
            </SlimSectionBody>
          </SlimSection>
          <SlimSection>
            <SlimSectionHeader>
              <SlimSectionTitle>
                <a id="lifestyle" />
                Medical history
              </SlimSectionTitle>
            </SlimSectionHeader>
            <SlimSectionBody>
              <PatientSectionLifestyle />
            </SlimSectionBody>
          </SlimSection>
          <SlimSection>
            <SlimSectionHeader>
              <SlimSectionTitle>
                <a id="forms" />
                Assessment forms
              </SlimSectionTitle>
            </SlimSectionHeader>
            <SlimSectionBody>
              <PatientSectionForms />
            </SlimSectionBody>
          </SlimSection>
        </PageBody>
      </Page>
    </>
  );
};

export interface IPatientProfileDemographicsProps {}

/**
 * Show the patients demographics.
 */
export const PatientProfileDemographics: React.FC<
  IPatientProfileDemographicsProps
> = ({}) => {
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();
  const { url: patientPhotoUrl } = useGetPhotoUrl(nextPatient?.fhir);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const closeModal = () => setShowProfileModal(false);

  return (
    <>
      <VStack>
        <PatientSummary
          name={nextPatient.getDisplayName()}
          dob={nextPatient.fhir?.birthDate}
          photoUrl={patientPhotoUrl}
          layout={TLayoutDirections.Column}
          colorScheme={EColorScheme.Light}
        >
          <AltButton
            size={EStandardSizes.ExtraSmall}
            onClick={() => setShowProfileModal(true)}
          >
            Set profile image
          </AltButton>
        </PatientSummary>
        <PatientDemographics hide={{ basics: true }} />
        <PatientPaymentDetails
          patientSource={EPaymentDetailsPatientSource.Session}
          gatewayId={currentLocation?.paydockServiceId}
        />
      </VStack>
      <PatientFormModal
        prefillData={{ Patient: nextPatient.fhir }}
        formSlug={showProfileModal ? "patient-profile-image" : undefined}
        onClose={closeModal}
        onFormSubmitSuccess={closeModal}
      />
    </>
  );
};
