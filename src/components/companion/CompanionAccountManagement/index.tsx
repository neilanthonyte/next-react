import * as React from "react";
import { useEffect, useState } from "react";

import { EPatientAcountStatus } from "next-shared/src/types/EPatientAcountStatus";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useCheckAccessCode } from "../../../hooks/patient/useCheckAccessCode";
import { ScopeEhrPatientSignupFlow } from "../../atoms/ScopeEhrPatientSignupFlow";
import { VStack } from "../../structure/VStack";
import { PhoneMismatchMessage } from "../PhoneMismatchMessage";
import { PatientAppInstructions } from "../PatientAppInstructions";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { CompanionLogin } from "../CompanionLogin";
import { ViewToggle } from "../../generic/InlineOptions";
import { EPatientLoginMode, PatientLogin } from "../../atoms/PatientLogin";
import { Choice } from "../../generic/Choice";
import { Resource } from "../../generic/Resource";

type TViewOptions = "Sign Up" | "Sign In";

export interface ICompanionAccountManagementProps {}

/**
 * Prompts the patient to complete their account set up, i.e. create and link it
 * to a Next Practice patient account.
 */
export const CompanionAccountManagement: React.FC<
  ICompanionAccountManagementProps
> = ({}) => {
  const { ehrPatient } = useSyncedSessionData();
  const { data: checkAccessCode, ...rest } = useCheckAccessCode(
    ehrPatient?.appAccessCode,
  );

  const onSuccess = () => {
    // should automatically refresh
  };

  const [completeOnPhone, setCompleteOnPhone] = useState<boolean>();

  useEffect(() => {
    setCompleteOnPhone(undefined);
  }, []);

  const viewOptions: TViewOptions[] = ["Sign Up", "Sign In"];
  const [show, setShow] = useState<string>(viewOptions[0]);

  const getContent = () => {
    switch (checkAccessCode?.status) {
      case EPatientAcountStatus.ExistingAccount:
        return (
          <VStack>
            <p>
              We require you to complete the sign-up process below so you can
              access health information sent to you by our care team.
            </p>
            <br />
            <Choice
              heading="Do you want to complete this process on the Next Practice mobile app?"
              description="The app is the best way to access your medical information, including intructions, referral letters, invoices, medication tracking and more"
              choices={[
                {
                  label: "Yes",
                  isSelected: completeOnPhone === true,
                  onSelect: () => setCompleteOnPhone(true),
                },
                {
                  label: "No",
                  isSelected: completeOnPhone === false,
                  onSelect: () => setCompleteOnPhone(false),
                },
              ]}
            />
            {completeOnPhone === true && <PatientAppInstructions />}
            {completeOnPhone === false && (
              <CompanionLogin
                onLoginSuccess={onSuccess}
                emailPlaceholder={checkAccessCode?.obfuscatedEmail}
              />
            )}
          </VStack>
        );
      case EPatientAcountStatus.PhoneMismatch:
        // need to resolve mismatch, show message
        return (
          <PhoneMismatchMessage email={checkAccessCode?.obfuscatedEmail} />
        );
      case EPatientAcountStatus.NewAccount:
        return (
          <div>
            <VStack>
              <p>
                To access the health information sent to you by our care team
                you need to set up a Next Practice account.
              </p>
              <Choice
                heading="Do you want to complete this process on the Next Practice mobile app?"
                description="The app is the best way to access your medical information, including intructions, referral letters, invoices, medication tracking and more"
                choices={[
                  {
                    label: "Yes",
                    isSelected: completeOnPhone === true,
                    onSelect: () => setCompleteOnPhone(true),
                  },
                  {
                    label: "No",
                    isSelected: completeOnPhone === false,
                    onSelect: () => setCompleteOnPhone(false),
                  },
                ]}
              />
              {completeOnPhone === true && <PatientAppInstructions />}
              {completeOnPhone === false && (
                <Resource>
                  <VStack>
                    {/* forgive me, for I have sinned */}
                    <div style={{ textAlign: "center" }}>
                      <h4>Complete the sign-up here</h4>
                      <br />
                      <ViewToggle
                        options={viewOptions}
                        selected={show}
                        onSelection={setShow}
                      />
                    </div>
                    {show === "Sign In" ? (
                      <VStack>
                        <p>
                          Please sign in using your email and password. You will
                          only need to do this once.
                        </p>
                        <PatientLogin
                          loginMode={EPatientLoginMode.Companion}
                          onLoginSuccess={onSuccess}
                          title={null}
                          message={null}
                          showLogo={false}
                        />
                      </VStack>
                    ) : (
                      <VStack>
                        <div>
                          <p>
                            To start the sign up process, we will send an invite
                            code to the phone number on record.
                          </p>
                        </div>
                        <br />
                        <ScopeEhrPatientSignupFlow onSuccess={onSuccess} />
                      </VStack>
                    )}
                  </VStack>
                </Resource>
              )}
            </VStack>
          </div>
        );
      default:
        return null;
    }
  };
  return <LoadingBlock {...rest}>{getContent()}</LoadingBlock>;
};
