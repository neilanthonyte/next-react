import * as React from "react";
import { useMemo, useState } from "react";
import { useMutation } from "react-query";
import moment from "moment";

import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useClient } from "../../../../../hooks/useClient";
import { useSyncedSessionData } from "../../../../../hooks/core/useSyncedSessionData";
import { CreditCardModal } from "../../../../modals/CreditCardModal";
import { OneTimePaymentModal } from "../../../../modals/OneTimePaymentModal";
import { CreditCardCard } from "../../../../payments/CreditCardCard";
import { VStack } from "../../../../structure/VStack";
import { LoadingBlock } from "../../../../structure/LoadingBlock";
import { useActiveLocation } from "../../../../../hooks/core/useActiveLocation";
import { HStack, Solid } from "../../../../structure/HStack";
import { DangerBadge } from "../../../../generic/Badge";
import { usePatientPaymentDetailsForGatewayId } from "../../../../../hooks/patient/usePatientPaymentDetailsForGatewayId";
import { PayDockContext } from "../../../../../contexts/PayDockContext";
import { useSyncedEhrPatientAppointments } from "../../../../../hooks/patient/useSyncedEhrPatientAppointments";
import { Button } from "../../../../generic/Button";
import { List, ListItem } from "../../../../structure/List";
import {
  IActivePaymentActionState,
  EPaymentDetailsAction,
} from "../CreditCardsPanel/index";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
export const css = cssComposer(styles, "AppointmentCreditCards");

export interface IAppointmentCreditCardsProps {}
/**
 * Component rendering credit card details associated to the Next patient record in session
 * and a list of available credit cards saved against upcoming appointments if any
 */

export const AppointmentCreditCards: React.FC<
  IAppointmentCreditCardsProps
> = () => {
  const client = useClient();
  const { nextPatient, ehrPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  if (currentLocation && !currentLocation.paydockServiceId) {
    console.warn(
      "EHR not setup to receive payments, missing paydock settings.",
    );
  }

  const [appointmentIdForPaymentInfo, setAppointmentIdForPaymentInfo] =
    useState<string>(null);

  // TODO this will be replaced by new synced patient payment
  const { patientPaymentDetails, ...patientPaymentsQueryRest } =
    usePatientPaymentDetailsForGatewayId(
      nextPatient?.patientId,
      currentLocation?.paydockServiceId,
      currentLocation?.slug,
      nextPatient?.paymentInformationUpdatedAt,
    );

  const {
    patientAppointments: { all: allAppointments },
    ...patientAppointmentsQueryRest
  } = useSyncedEhrPatientAppointments(
    ehrPatient?.association?.ehrId,
    ehrPatient?.ehrPatientId,
  );

  const [setAppointmentPaymentInfo, {}] = useMutation(
    (creditCard: IProvisionalCreditCard) =>
      client.appointments.storeAppointmentPaymentInformation(
        ehrPatient?.association?.ehrId,
        appointmentIdForPaymentInfo,
        creditCard.cardToken,
      ),
    {
      onSuccess: () => {
        setAppointmentIdForPaymentInfo(null);
      },
    },
  );

  const appointmentsWithPayments = useMemo(() => {
    if (!allAppointments) return [];
    return allAppointments.filter((a) => !!a.payment);
  }, [allAppointments]);

  const [activePaymentAction, setActivePaymentAction] =
    useState<IActivePaymentActionState>(null);

  const paydockContextValue = useMemo(() => {
    return {
      gatewayId: currentLocation?.paydockServiceId,
      prefillData: {
        nameOnCard:
          nextPatient?.getDisplayName() || ehrPatient?.getDisplayName(),
        email: nextPatient?.getFhirEmail() || ehrPatient?.getFhirEmail(),
      },
    };
  }, [nextPatient, ehrPatient, currentLocation]);

  const showAppointmentOneTimePaymentModal =
    activePaymentAction?.appointmentWithDetails &&
    activePaymentAction.action === EPaymentDetailsAction.Charge;

  return (
    <div className={css("")}>
      <VStack size="compact">
        <HStack>
          <h4>One-time Credit Cards </h4>
          <Solid>
            <DangerBadge>{appointmentsWithPayments.length}</DangerBadge>
          </Solid>
        </HStack>
        <LoadingBlock {...patientAppointmentsQueryRest}>
          {(allAppointments || []).length > 0 && (
            <List scale="compact">
              {allAppointments.map((apptWithDetails) => {
                const appointmentUtil = fhirUtil<FhirAppointmentUtil>(
                  apptWithDetails.appointment,
                );
                const { appointment } = apptWithDetails;
                const momentStart = moment(appointment.start);
                const now = moment();

                const label =
                  appointmentUtil.getNextAppointmentTypeLabel() ||
                  "Helix appointment";
                const date = momentStart.isSame(now, "dates")
                  ? "Today"
                  : momentStart.format("DD MMMM YYYY");
                const at = momentStart.format("h:mma");

                return (
                  <ListItem key={apptWithDetails.appointment.id}>
                    <VStack>
                      <div className={css("heading")}>
                        <label>
                          {date}: {label} @ {at}
                        </label>
                        {!apptWithDetails.payment && (
                          <Button
                            size={EStandardSizes.ExtraSmall}
                            variant="secondary"
                            onClick={() =>
                              setAppointmentIdForPaymentInfo(
                                apptWithDetails.appointment.id,
                              )
                            }
                          >
                            Set card
                          </Button>
                        )}
                      </div>
                      {!!apptWithDetails.payment && (
                        <CreditCardCard
                          key={apptWithDetails.appointment.id}
                          card={apptWithDetails.payment}
                          actions={[
                            {
                              label: "Charge",
                              onClick: () =>
                                setActivePaymentAction({
                                  action: EPaymentDetailsAction.Charge,
                                  appointmentWithDetails: apptWithDetails,
                                }),
                              variant: "primary",
                            },
                          ]}
                        />
                      )}
                    </VStack>
                  </ListItem>
                );
              })}
            </List>
          )}
        </LoadingBlock>
      </VStack>
      {showAppointmentOneTimePaymentModal && (
        <OneTimePaymentModal
          appointmentWithDetails={activePaymentAction.appointmentWithDetails}
          close={() => setActivePaymentAction(null)}
        />
      )}
      {!!appointmentIdForPaymentInfo && (
        <PayDockContext.Provider value={paydockContextValue}>
          <CreditCardModal
            onSuccess={(card) => setAppointmentPaymentInfo(card)}
            onClose={() => setAppointmentIdForPaymentInfo(null)}
          />
        </PayDockContext.Provider>
      )}
    </div>
  );
};
