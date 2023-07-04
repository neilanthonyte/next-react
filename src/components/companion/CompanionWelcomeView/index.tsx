import * as React from "react";
import { useEffect, useState } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { Flow, FlowStep } from "../../structure/Flow";
import { CompanionAppointmentManagement } from "../CompanionAppointmentManagement";
import { CompanionAccountManagement } from "../CompanionAccountManagement";
import { EhrPatientForm } from "../EhrPatientForm";
import { VStack } from "../../structure/VStack";
import { EInclude } from "../../../types/IPersonalDetails";
import { HStack } from "../../structure/HStack";
import { Message, MessageBody } from "../../generic/Message";
import { LocationWelcomePage } from "../../generic/LocationWelcomePage";
import { PageCallout } from "../PageCallout";
import { PatientProfileDemographics } from "../CompanionProfileView";
import { DialogFooter } from "../../structure/Dialog";
import { Resource } from "../../generic/Resource";

enum ECompanionGuestSteps {
  ReasonForVisit = 0,
  Demographics = 1,
  NextPracticeAccount = 2,
  WhatNext = 3,
}

interface ICompanionWelcomeViewProps {}

/**
 * Guides the patient to the critical actions they need to take to get
 * set up on the Next Practice system (although, this is technically the wrapper
 * that styles the components handling the set up)
 */
export const CompanionWelcomeView: React.FC<
  ICompanionWelcomeViewProps
> = ({}) => {
  const { ehrPatient, nextPatient, scope } = useSyncedSessionData();
  const patientUtil = ehrPatient?.fhir
    ? fhirUtil<FhirPatientUtil>(ehrPatient.fhir)
    : null;
  const isProvisional = patientUtil ? patientUtil.isProvisional() : undefined;

  const steps: ECompanionGuestSteps[] = [
    ECompanionGuestSteps.ReasonForVisit,
    ECompanionGuestSteps.Demographics,
    ECompanionGuestSteps.NextPracticeAccount,
  ];

  const [step, setStep] = useState<ECompanionGuestSteps>(steps[0]);
  const stepIndex = steps.indexOf(step);

  useEffect(() => {
    setStep(steps[0]);
  }, [ehrPatient?.ehrPatientId]);

  // progress to the next step
  const nextStep = () => {
    setStep(steps[stepIndex + 1]);
  };

  return (
    <LocationWelcomePage>
      <VStack>
        <Flow step={stepIndex}>
          {steps.includes(ECompanionGuestSteps.ReasonForVisit) && (
            <FlowStep
              title="Confirm your reason for visit"
              edit={{
                label: "Change",
                onClick: () => setStep(ECompanionGuestSteps.ReasonForVisit),
              }}
            >
              <CompanionAppointmentManagement onComplete={() => nextStep()} />
            </FlowStep>
          )}
          {steps.includes(ECompanionGuestSteps.Demographics) && (
            <FlowStep
              title="Confirm your details"
              edit={{
                label: "Change",
                onClick: () => setStep(ECompanionGuestSteps.Demographics),
              }}
            >
              {!nextPatient ? (
                <VStack>
                  <Message>
                    <MessageBody>
                      {isProvisional && (
                        <span>
                          You are missing some essential information on your
                          medical record.
                        </span>
                      )}{" "}
                      Please review the details below to ensure they are up to
                      date.
                    </MessageBody>
                  </Message>
                  <Resource>
                    <EhrPatientForm
                      include={{
                        // basics: EInclude.Required,
                        // termsAndConditions: EInclude.Required,
                        address: EInclude.Required,
                        emergencyContact: EInclude.Required,
                        medicare: EInclude.Optional,
                        concession: EInclude.Optional,
                        dva: EInclude.Optional,
                      }}
                      onRecordUpdate={() => {
                        nextStep();
                      }}
                    />
                  </Resource>
                </VStack>
              ) : (
                <>
                  <PatientProfileDemographics />
                  <DialogFooter acceptLabel="Next" onAccept={nextStep} />
                </>
              )}
            </FlowStep>
          )}
          {steps.includes(ECompanionGuestSteps.NextPracticeAccount) && (
            <FlowStep
              title="Finish"
              edit={{
                label: "Access your information after your appointment",
                onClick: () =>
                  setStep(ECompanionGuestSteps.NextPracticeAccount),
              }}
            >
              {!nextPatient ? (
                <CompanionAccountManagement />
              ) : (
                <VStack>
                  <p>
                    Access the health information sent to you by our care team -
                    just log into the Next Practice app.
                  </p>
                  {/* TODO add the selling points from the website */}
                  <HStack>
                    <PageCallout
                      to="/profile"
                      icon="avatar-genderless"
                      label="Profile & appointments"
                    />
                    <PageCallout
                      icon="education-topics"
                      to="/medical-articles"
                      label="Articles"
                    />
                  </HStack>
                </VStack>
              )}
            </FlowStep>
          )}
        </Flow>
      </VStack>
    </LocationWelcomePage>
  );
};
