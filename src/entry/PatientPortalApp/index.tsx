import * as React from "react";
import { useCallback, useState } from "react";
import { queryCache } from "react-query";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { EColorScheme } from "next-shared/src/types/colorScheme";
import { TLayoutDirections } from "next-shared/src/types/layouts";

import { useSyncedSessionData } from "../../hooks/core/useSyncedSessionData";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { NextPatientSignupOrSiginView } from "../../components/views/NextPatientSignupOrSiginView";
import { PatientDemographics } from "../../components/atoms/PatientDemographics";
import {
  EPaymentDetailsPatientSource,
  PatientPaymentDetails,
} from "../../components/atoms/PatientPaymentsDetails";
import {
  PatientSectionLifestyle,
  PatientSectionForms,
} from "../../components/atoms/PatientSubmittedForms";
import { Page, PageBody } from "../../components/structure/Page";
import {
  SlimSection,
  SlimSectionHeader,
  SlimSectionTitle,
  SlimSectionBody,
} from "../../components/structure/SlimSection";
import { PatientSummary } from "../../components/atoms/PatientSummary";
import { AltButton, Button } from "../../components/generic/Button";
import { useClient } from "../../hooks/useClient";
import { Dropdown } from "../../components/generic/Dropdown";
import { NextPatientPastAppointments } from "../../components/atoms/NextPatientPastAppointments";
import { NextPatientUpcomingAppointments } from "../../components/atoms/NextPatientUpcomingAppointments";
import { BookingWidget, IBookingWidgetProps } from "../BookingWidget";
import { RETRIEVE_APPOINTMENTS_QUERY_KEY } from "../../hooks/patient/usePatientAppointments";
import { useGetPhotoUrl } from "next-react/src/hooks/useGetPhotoUrl";

export interface IPatientPortalAppProps {}

/**
 * App rendering patient portal with information about logged in patient
 * Renders signup/signin as fallback
 */
export const PatientPortalApp: React.FC<IPatientPortalAppProps> = ({}) => {
  return (
    <NextAppHandlerWeb>
      <PatientPortal />
    </NextAppHandlerWeb>
  );
};

export const PatientPortal = () => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { url: patientPhotoUrl } = useGetPhotoUrl(nextPatient?.fhir);

  const handleLogout = useCallback(() => {
    if (
      !confirm(
        "Are you sure you would like to logout of your Next Practice account?",
      )
    ) {
      return;
    }
    return client.auth.logout().catch(console.error);
  }, []);

  if (!nextPatient) return <NextPatientSignupOrSiginView />;

  return (
    <Page>
      <PageBody>
        <SlimSection>
          <SlimSectionBody>
            <PatientSummary
              name={nextPatient.getDisplayName()}
              dob={nextPatient.fhir?.birthDate}
              layout={TLayoutDirections.Column}
              colorScheme={EColorScheme.Light}
              photoUrl={patientPhotoUrl}
            >
              <AltButton size={EStandardSizes.Small} onClick={handleLogout}>
                Logout
              </AltButton>
            </PatientSummary>
          </SlimSectionBody>
        </SlimSection>
        <NextPatientAppointmentsSection />
        <SlimSection>
          <SlimSectionHeader>
            <SlimSectionTitle>
              <a id="demographics" />
              Review your personal details
            </SlimSectionTitle>
          </SlimSectionHeader>
          <SlimSectionBody>
            <PatientDemographics />
          </SlimSectionBody>
        </SlimSection>
        <SlimSection>
          <SlimSectionHeader>
            <SlimSectionTitle>
              <a id="payments" />
              Payment details
            </SlimSectionTitle>
          </SlimSectionHeader>
          <SlimSectionBody>
            <PatientPaymentDetails
              patientSource={EPaymentDetailsPatientSource.Session}
            />
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
              Self assessment forms
            </SlimSectionTitle>
          </SlimSectionHeader>
          <SlimSectionBody>
            <PatientSectionForms />
          </SlimSectionBody>
        </SlimSection>
      </PageBody>
    </Page>
  );
};

enum EAppointmentsListFilters {
  Upcoming = "Upcoming",
  Past = "Past",
}

/**
 * Component showing next patient upcoming and past appointemnts
 *
 * TODO generalise and move into own component, right now it has a very specific rendering
 * with slim sections for the profile view
 */
const NextPatientAppointmentsSection: React.FC = () => {
  const { nextPatient } = useSyncedSessionData();

  const [activeFilter, setActiveFilter] = useState<EAppointmentsListFilters>(
    EAppointmentsListFilters.Upcoming,
  );

  const [bookingPreselection, setBookingPreselection] =
    useState<Partial<IBookingWidgetProps>>();

  const handleOnBook = (bookingPreselection?: Partial<IBookingWidgetProps>) => {
    // if no preselection passed in, set object with empty value to trigger booking popup
    const preselection = bookingPreselection || {
      locationSlug: null,
      hcpSlug: null,
    };
    setBookingPreselection(preselection);
  };

  const handleOnBookingSuccess = () => {
    // invalidate appointments queries to refetch data
    queryCache.invalidateQueries([
      RETRIEVE_APPOINTMENTS_QUERY_KEY,
      nextPatient?.patientId,
    ]);
    // reset state to close the modal
    setBookingPreselection(undefined);
  };

  return (
    <>
      <SlimSection>
        <SlimSectionHeader>
          <SlimSectionTitle>
            <a id="appointments" />
            {`${activeFilter} appointments`}
          </SlimSectionTitle>

          <Dropdown
            options={Object.values(EAppointmentsListFilters)}
            selectedOption={activeFilter}
            staticLabel={activeFilter}
            onOptionChange={() =>
              setActiveFilter((f) =>
                f === EAppointmentsListFilters.Upcoming
                  ? EAppointmentsListFilters.Past
                  : EAppointmentsListFilters.Upcoming,
              )
            }
            stdSize={EStandardSizes.ExtraSmall}
            widthInChars={8}
            active={true}
          />
          {/* HACK there is no current component that can handle this */}
          <div style={{ marginLeft: 8 }}>
            <Button onClick={() => handleOnBook()} size={EStandardSizes.Small}>
              Book new appointment
            </Button>
          </div>
        </SlimSectionHeader>
        <SlimSectionBody>
          {activeFilter === EAppointmentsListFilters.Upcoming ? (
            <NextPatientUpcomingAppointments onBook={handleOnBook} />
          ) : (
            <NextPatientPastAppointments onBook={handleOnBook} />
          )}
        </SlimSectionBody>
      </SlimSection>
      {bookingPreselection && (
        <BookingWidget
          popover={true}
          locationSlug={bookingPreselection.locationSlug}
          hcpSlug={bookingPreselection.hcpSlug}
          onBack={() => setBookingPreselection(undefined)}
          onBookingSuccess={handleOnBookingSuccess}
        />
      )}
    </>
  );
};
