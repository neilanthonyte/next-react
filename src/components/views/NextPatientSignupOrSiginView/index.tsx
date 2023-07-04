import * as React from "react";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";

import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";

import { useClient } from "../../../hooks/useClient";
import { PatientLogin } from "../../atoms/PatientLogin";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { Page, PageBody } from "../../structure/Page";
import {
  SlimSection,
  SlimSectionHeader,
  SlimSectionTitle,
  SlimSectionBody,
} from "../../structure/SlimSection";
import {
  TabbedContent,
  TabbedContentPanel,
  TabbedContentPanels,
  TabbedContentTab,
  TabbedContentTabs,
} from "../../structure/TabbedContent";
import { MatchingPatientResultHandler } from "../../appointment-bookings/MatchingPatientResultHandler";
import { NextAccountBenefits } from "../../atoms/NextAccountBenefits";
import {
  IPatientBasicsFormData,
  PatientBasicsForm,
} from "../../appointment-bookings/PatientBasicsForm";

export interface INextPatientSignupOrSiginViewProps {
  redirectPath?: string;
}

/**
 * Component rendering options to create a Next Practice account or login with an existing one
 */
export const NextPatientSignupOrSiginView: React.FC<
  INextPatientSignupOrSiginViewProps
> = ({ redirectPath }) => {
  const client = useClient();
  const history = useHistory();

  const [pendingPatient, setPendingPatient] = useState<fhir3.Patient>(null);

  const [checkForMatch, { data: matchResult, error, reset }] =
    useMutation<ICheckForMatchingPatientResult>(
      (formData: IPatientBasicsFormData) => {
        setPendingPatient(formData.Patient);
        return client.bookings.checkForMatchingPatient(formData.Patient);
      },
    );

  // HACK had to create and use callbacks from both login and account creation
  // to handle the automatic route redirect on session change instead of useEffect
  // because this component could unmount by a parent component rendering something
  // different on session change
  const handleOnSuccess = useCallback(() => {
    redirectPath && history.push(redirectPath);
    setPendingPatient(null);
  }, [redirectPath]);

  return (
    <Page>
      <PageBody>
        <SlimSection>
          <SlimSectionHeader>
            <SlimSectionTitle>
              <a id="account" />
              Next Practice account
            </SlimSectionTitle>
          </SlimSectionHeader>
          <SlimSectionBody>
            <NextAccountBenefits />
          </SlimSectionBody>
          <SlimSectionBody>
            <TabbedContent>
              <TabbedContentTabs>
                <TabbedContentTab label="Login" />
                <TabbedContentTab label="Create account" />
              </TabbedContentTabs>
              <TabbedContentPanels>
                <TabbedContentPanel>
                  <PatientLogin
                    onLoginSuccess={handleOnSuccess}
                    message={null}
                  />
                </TabbedContentPanel>
                <TabbedContentPanel>
                  <PatientBasicsForm onSuccess={checkForMatch} />
                </TabbedContentPanel>
              </TabbedContentPanels>
            </TabbedContent>
            {error && <ErrorPlaceholder />}
            <MatchingPatientResultHandler
              result={matchResult}
              patient={pendingPatient}
              onCancel={reset}
              onAuthenticated={handleOnSuccess}
            />
          </SlimSectionBody>
        </SlimSection>
      </PageBody>
    </Page>
  );
};
