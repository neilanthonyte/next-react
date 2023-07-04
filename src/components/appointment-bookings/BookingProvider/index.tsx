import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import * as _ from "lodash";

import {
  AppointmentType,
  TAppointmentTypePatientType,
} from "next-shared/src/models/AppointmentType";
import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";

import {
  BookingContext,
  BOOKING_STAGES,
  SKIPABLE_STAGES,
  IAppointmentBookingPreselection,
  IAppointmentBookingsContextValue,
} from "../../../contexts/AppointmentBookingContext";
import { useClient } from "../../../hooks/useClient";
import { useHcps } from "../../../hooks/content/useHcps";
import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";
import { useLocations } from "../../../hooks/content/useLocations";
import { usePersonalDetailsBuilder } from "./hooks/usePersonalDetailsBuilder";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useConfig } from "../../../hooks/core/useConfig";
import { appointmentPatientQuestionnaireMetadataExtensionUrl } from "next-shared/src/helpers/constants";

export interface IAppointmentBookingCallbacks {
  onCompleteDismiss?: () => any;
  onBookingSuccess?: (locationSlug: string) => void;
}

export interface IBookingProviderProps extends IAppointmentBookingCallbacks {
  preselection?: IAppointmentBookingPreselection;
  covidRisk?: boolean;
  guestMode?: boolean;
}

interface IBookingProviderInnerProps extends IBookingProviderProps {
  // data
  allLocations: NextLocation[];
  allHcps: Hcp[];
  allAppointmentTypes: AppointmentType[];
  // preselection
  initLocation: NextLocation;
  initHcp: Hcp;
  initAppointmentType: AppointmentType;
  initSlot: ISlotWithHcp;
}

const BookingProviderInner: React.FC<IBookingProviderInnerProps> = ({
  children,
  onCompleteDismiss,
  onBookingSuccess,
  covidRisk,
  guestMode,
  // data
  allLocations,
  allHcps,
  allAppointmentTypes,
  // preselection
  initLocation,
  initHcp,
  initAppointmentType,
  initSlot,
}) => {
  const client = useClient();

  const { nextPatient } = useSyncedSessionData();
  const config = useConfig();

  const [loc, setLocation] = useState<NextLocation>(initLocation);
  const [hcp, setHcp] = useState<Hcp>(initHcp);
  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>(initAppointmentType);
  const [slot, setSlot] = useState<ISlotWithHcp>(initSlot);
  const [isAtCovidRisk, setIsAtCovidRisk] = useState<boolean>(covidRisk);
  const [isExempt, setIsExempt] = useState<boolean>();
  const [preferredMethod, setPreferredMethod] = useState<string>();

  // the patient to book against - either copied from the session or created new
  const {
    isModified: isPatientModified,
    patientId,
    patient,
    setPatient,
    clearPatient,
    updatePersonals,
  } = usePersonalDetailsBuilder();

  // this may be asked before the patient logs in (so the patient is still undefined)
  const [patientBookingForSelf, setPatientBookingForSelf] = useState<
    null | boolean
  >(null);
  const [patientType, setPatientType] =
    useState<TAppointmentTypePatientType>(undefined);

  const [additionalTimeRequired, setAdditionalTimeRequired] = useState<
    null | number
  >(null);

  const [notes, setNotes] = useState<any>(null);
  const [stage, setStage] = useState<number>(BOOKING_STAGES.Location);
  // payment details
  const [newCard, setNewCard] = useState<IProvisionalCreditCard>();
  const [existingCard, setExistingCard] = useState<ICreditCard>();

  // the patient's response to the presentation form
  const [presentationFormResponse, setPresentationFormResponse] =
    useState<any>();

  // clearing with support for preselection
  const clearLocation = useCallback(() => {
    return setLocation(initLocation || null);
  }, [initLocation]);

  // hcp
  const clearHcp = useCallback(() => {
    return setHcp(initHcp || null);
  }, [initHcp]);

  // appointment type
  const clearAppointmentType = useCallback(() => {
    return setAppointmentType(initAppointmentType || null);
  }, [initAppointmentType]);

  // slot
  const clearSlot = () => setSlot(null);

  // CLEARING: cascade changes, where top changes cause sub-selections to clear
  // TODO - consider custom / named useEffects to make this more readable
  useEffect(() => {
    if (!loc) {
      clearHcp();
      clearAppointmentType();
    } else if (hcp && hcp.worksAt !== loc.slug) {
      // hcp does not work at the chosen location
      clearHcp();
    }
  }, [loc]);
  useEffect(() => {
    if (!hcp) {
      clearAppointmentType();
    } else if (
      appointmentType &&
      hcp.appointmentTypeSlugs.indexOf(appointmentType.slug) === -1
    ) {
      // current hcp doesn't support the chosen appointment type
      clearAppointmentType();
    }
  }, [hcp]);
  useEffect(() => {
    setAdditionalTimeRequired(0);

    if (!appointmentType) {
      clearSlot();
    } else if (slot && slot.appointmentType !== appointmentType.slug) {
      // current appointment type not offered by slot
      clearSlot();
    }
  }, [appointmentType]);

  const appointmentLength = useMemo(() => {
    if (!appointmentType) {
      return null;
    }
    let length = appointmentType.lengthMinutes;
    if (patientType === "new" && appointmentType.lengthOverrides.newPatient) {
      length += appointmentType.lengthOverrides.newPatient;
    }
    return length;
  }, [appointmentType, patientType]);

  const appointmentLengthWithExtensions = useMemo<null | number>(() => {
    if (!appointmentLength) {
      return null;
    }
    return appointmentLength + (additionalTimeRequired || 0);
  }, [appointmentLength, additionalTimeRequired]);

  const bookAppointment = useCallback(async () => {
    setStage(BOOKING_STAGES.Processing);
    const extensions = [];
    const fullNotes = [];

    // HACK fetch from: https://nextpracticehealth.com/legals/terms-and-conditions.json
    fullNotes.push({
      label: "Consent",
      value: "1.0.2",
    });

    if (isAtCovidRisk !== undefined) {
      fullNotes.push({
        label: "COVID?",
        value: isAtCovidRisk ? "Yes" : "No",
      });
    }
    if (isExempt !== undefined) {
      fullNotes.push({
        label: "Exempt?",
        value: isExempt ? "Yes" : "No",
      });
    }
    // state if the patient would prefer a digial or physical appointment
    if (preferredMethod !== undefined) {
      fullNotes.push({
        label: "Preferrence",
        value: preferredMethod,
      });
    }
    if (notes && typeof notes === "object" && Object.values(notes).length > 0) {
      fullNotes.push({ label: "Info", value: notes });
    }

    extensions.push({
      url: appointmentPatientQuestionnaireMetadataExtensionUrl,
      valueString: JSON.stringify(fullNotes),
    });

    // HACK strip empty data
    if (_.isEqual(patient.address, [{ line: [] }])) {
      delete patient.address;
    }
    if (_.isEqual(patient.contact, [{ telecom: [{ system: "phone" }] }])) {
      delete patient.contact;
    }

    return client.bookings
      .bookAppointment({
        patient,
        singleUseCreditCardToken: newCard?.cardToken,
        usePatientsCreditCard: !!existingCard && !newCard?.cardToken,
        practitionerId: hcp.npServicesId,
        start: moment(slot.start).unix(),
        appointmentType: appointmentType.slug,
        extension: extensions,
        returnImmediately: config.appointmentBookingReturnImmediately,
        overrideAppointmentLength: appointmentLengthWithExtensions,
        reasonForVisit: presentationFormResponse,
      })
      .then(() => {
        setStage(BOOKING_STAGES.Complete);

        if (onBookingSuccess && typeof onBookingSuccess === "function") {
          onBookingSuccess(loc.slug);
        }
      });
  }, [
    patient,
    patientType,
    notes,
    existingCard,
    newCard,
    appointmentType,
    hcp,
    slot,
    loc,
    preferredMethod,
    isExempt,
    appointmentLengthWithExtensions,
    presentationFormResponse,
    client.auth.session,
  ]);

  // infer the location - allows for quick selection
  useEffect(() => {
    if (!hcp || !allLocations) return;
    setLocation(allLocations.find((l) => l.slug === hcp.worksAt));
  }, [allLocations, hcp]);
  // infer the HCP
  useEffect(() => {
    if (!slot || !slot.hcp || !allHcps) return;
    const hcp = allHcps.find((h) => h.npServicesId == slot.hcp.npServicesId);
    setHcp(hcp);
  }, [slot, allHcps]);

  const filteredHcps = useMemo(() => {
    if (!allHcps) return null;
    // filter to those at the current location
    return allHcps.filter((hcp) => !loc || hcp.worksAt === loc.slug);
  }, [allHcps, loc]);

  const filteredAppointmentTypes = useMemo(() => {
    if (!allAppointmentTypes || !allHcps) {
      return null;
    }

    // set 'disabledReason' to null on all appointment types.
    allAppointmentTypes.forEach((a) => {
      a.disabledReason = null;
    });

    // all appointments for the location's HCPs
    const allHcpAppointmentSlugs = _.flatten(
      allHcps
        .filter((h) => loc && h.worksAt === loc.slug)
        .map((h) => h.appointmentTypeSlugs),
    );

    const locationAppointments = !loc
      ? allAppointmentTypes
      : allAppointmentTypes.filter(
          (a) => allHcpAppointmentSlugs.indexOf(a.slug) > -1,
        );

    // filter by patient type
    const patientTypeAppointments = locationAppointments.filter(
      (l) =>
        !patientType ||
        patientType === "all" ||
        (patientType === "new" && l.patientType !== "returning") ||
        (patientType === "returning" && l.patientType !== "new"),
    );

    // appointments for current hcp
    const hcpAppointments = !hcp
      ? patientTypeAppointments
      : // ensure order is maintained
        hcp.appointmentTypeSlugs
          .map((slug) => patientTypeAppointments.find((a) => a.slug === slug))
          // cater for private appointments (slug exists on hcp, excluded from global appointment type list)
          .filter((n) => !!n);

    // add disabled reason to physical appointments if at covid risk
    return hcpAppointments.map((a) => {
      if (isAtCovidRisk && a.method === "physical") {
        a.disabledReason = "Patient is at risk of COVID";
      }
      return a;
    });
  }, [loc, isAtCovidRisk, allAppointmentTypes, allHcps, hcp, patientType]);

  const _onCompleteDismiss = () => {
    typeof onCompleteDismiss === "function" && onCompleteDismiss();
    clear();
  };

  const clear = useCallback(() => {
    // although they cascade, the preselection might cause this to not fully flow through
    clearLocation();
    clearHcp();
    clearAppointmentType();
    clearSlot();
    clearPatient();
    setIsAtCovidRisk(undefined);
  }, [
    clearLocation,
    clearHcp,
    clearAppointmentType,
    clearSlot,
    clearPatient,
    setIsAtCovidRisk,
  ]);

  // automatically compute the stage based on selections - only for stepping forward
  useEffect(() => {
    // CLEARING:
    // location
    if (!loc && stage !== BOOKING_STAGES.Location) {
      setStage(BOOKING_STAGES.Location);
    }
    // appointment type
    if (loc && !appointmentType && stage !== BOOKING_STAGES.Type) {
      setStage(BOOKING_STAGES.Type);
    }
    // time
    if (loc && appointmentType && !slot && stage !== BOOKING_STAGES.Time) {
      if (loc.bookingFeatureTimingOverridesEnabled) {
        setStage(BOOKING_STAGES.OtherConcerns);
      } else {
        setStage(BOOKING_STAGES.Time);
      }
    }

    // SELECTION:
    // location
    if (loc && stage <= BOOKING_STAGES.Location) {
      setStage(BOOKING_STAGES.Type);
    }
    // type
    if (appointmentType && stage <= BOOKING_STAGES.Type) {
      if (loc.bookingFeatureTimingOverridesEnabled) {
        setStage(BOOKING_STAGES.OtherConcerns);
      } else {
        setStage(BOOKING_STAGES.Time);
      }
    }
    // time
    if (slot && stage <= BOOKING_STAGES.Time) {
      setStage(BOOKING_STAGES.Personals);
    }
  }, [stage, loc, hcp, appointmentType, slot]);

  const showPayments = useMemo(() => {
    // skip payment when a bulkbill appointment type
    return !appointmentType || !appointmentType.isBulkBilled();
  }, [appointmentType]);

  useEffect(() => {
    if (presentationFormResponse && stage === BOOKING_STAGES.Presentation) {
      if (showPayments) {
        setStage(BOOKING_STAGES.Payment);
      } else {
        setStage(BOOKING_STAGES.Review);
      }
    }
  }, [presentationFormResponse, showPayments]);

  // automatically load patient from session if booking for self
  useEffect(() => {
    if (patientBookingForSelf && nextPatient) {
      setPatient(nextPatient.fhir, nextPatient.patientId);

      if (
        stage > BOOKING_STAGES.Personals &&
        stage !== BOOKING_STAGES.Complete
      ) {
        // kick the user back to personal details if they've just logged in
        setStage(BOOKING_STAGES.Personals);
      }
    }
  }, [patientBookingForSelf, nextPatient?.patientId]);

  // automatically log out
  useEffect(() => {
    // were we booking for the session patient
    // TODO this will not allow you to book for another real patient
    if (patient?.id && patient?.id !== client.auth.session?.patientId) {
      clearPatient();
    }
    const personalStageIndex = Object.values(BOOKING_STAGES).indexOf(
      BOOKING_STAGES.Personals,
    );
    const currentStageIndex = Object.values(BOOKING_STAGES).indexOf(stage);

    if (
      currentStageIndex > personalStageIndex &&
      stage !== BOOKING_STAGES.Complete
    ) {
      setStage(BOOKING_STAGES.Personals);
    }
  }, [nextPatient?.patientId]);

  // automatically clear
  useEffect(() => {
    if (patientBookingForSelf === false) {
      clearPatient();
      setPatientType(undefined);
    }
  }, [patientBookingForSelf]);

  // manual steps
  const handleSetStage = useCallback(
    (newStage: number) => {
      // check if stage is allowed to be manually switched
      if (!SKIPABLE_STAGES.includes(newStage)) {
        return;
      }
      setStage(newStage);
    },
    [stage],
  );

  // indicate if something other than preselection has been made
  const selectionHasBeenMade: boolean = useMemo(() => {
    return !!(
      (!initLocation && loc) ||
      (!initHcp && hcp) ||
      (!initAppointmentType && appointmentType) ||
      (!initSlot && slot)
    );
  }, [
    loc,
    hcp,
    appointmentType,
    slot,
    initLocation,
    initHcp,
    initAppointmentType,
    initSlot,
  ]);

  const completePersonalsSection = useCallback(
    async (patientUpdates?: fhir3.Patient) => {
      let patientToSubmit = patient;
      let isModified = isPatientModified;

      if (patientUpdates) {
        // HACK to allow us to complete the section with the latest patient details
        patientToSubmit = await updatePersonals(patientUpdates);
        isModified = true;
      }

      const isGuest = !patientId;
      if (isGuest || !isModified) {
        setStage(BOOKING_STAGES.Presentation);
        return;
      }

      // only submit the supplementary personals sections here
      const detailsToSubmit: fhir3.Patient = {
        resourceType: "Patient",
        contact: patientToSubmit.contact,
        identifier: patientToSubmit.identifier,
        address: patientToSubmit.address,
      };

      return client.patients
        .storeFormData(patientId, { Patient: detailsToSubmit })
        .then(() => {
          setStage(BOOKING_STAGES.Presentation);
        });
    },
    [patient, isPatientModified, client, patientId],
  );

  const value: IAppointmentBookingsContextValue = useMemo(() => {
    return {
      // data
      locations: allLocations,
      hcps: filteredHcps,
      appointmentTypes: filteredAppointmentTypes,
      // preselection
      preselection: null, // HACK what uses this?
      // background
      isAtCovidRisk,
      setIsAtCovidRisk,
      // payment exemption
      isExempt,
      setIsExempt,
      // preference for physical vs digital (when either is allowed)
      preferredMethod,
      setPreferredMethod,
      patientBookingForSelf,
      setPatientBookingForSelf,
      // new vs returning
      patientType,
      setPatientType,
      hide: {
        location: !!initLocation,
        hcp: !!initHcp,
        appointmentType: !!initAppointmentType,
      },
      // selection
      selectionHasBeenMade,
      location: loc,
      setLocation,
      clearLocation,
      hcp,
      setHcp: setHcp,
      clearHcp,
      appointmentType,
      setAppointmentType,
      clearAppointmentType,
      slot,
      setSlot,
      clearSlot,
      // patient
      patient,
      setPatient,
      clearPatient,
      notes,
      setNotes,
      // payment
      existingCard,
      newCard,
      setExistingCard,
      setNewCard,
      // timing
      appointmentLength,
      additionalTimeRequired,
      appointmentLengthWithExtensions,
      setAdditionalTimeRequired,
      // actions
      clear,
      onCompleteDismiss: _onCompleteDismiss,
      bookAppointment,
      // state
      stage,
      presentationFormResponse,
      setPresentationFormResponse,
      setStage: handleSetStage,
      guestMode,
      updatePersonals,
      completePersonalsSection,
    };
  }, [
    allLocations,
    filteredHcps,
    filteredAppointmentTypes,
    isAtCovidRisk,
    isExempt,
    preferredMethod,
    patientBookingForSelf,
    patientType,
    loc,
    setLocation,
    clearLocation,
    hcp,
    clearHcp,
    appointmentType,
    clearAppointmentType,
    setAppointmentType,
    slot,
    clearSlot,
    patient,
    setPatient,
    clearPatient,
    notes,
    appointmentLength,
    additionalTimeRequired,
    appointmentLengthWithExtensions,
    setAdditionalTimeRequired,
    clear,
    _onCompleteDismiss,
    bookAppointment,
    stage,
    handleSetStage,
    presentationFormResponse,
    // payment
    existingCard,
    newCard,
    guestMode,
    updatePersonals,
    completePersonalsSection,
    initLocation,
    initHcp,
    initAppointmentType,
  ]);

  if (loc && !loc.allowBookings) {
    return null;
  }

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

const blankPreselection: IAppointmentBookingPreselection = {
  location: null,
  hcp: null,
  appointmentType: null,
  slot: null,
};

/**
 * Provides a BookingHandler. This wrapping component is responsible for pre-fetching
 * all data and extracting the preselection. This simplified the handler logic as it
 * does not need to concern itself with missing data.
 *
 * TODO - rename to AppointmentBookingsProvider or change the context to BookingsContext for better discoverability. Consider moving them closer
 */
export const BookingProvider: React.FC<IBookingProviderProps> = ({
  preselection: preselectionProps,
  children,
  ...rest
}) => {
  const urlPreselection: IAppointmentBookingPreselection = useMemo(() => {
    const urlParams = urlParamsToObject();
    return {
      location: urlParams.location as string,
      hcp: urlParams.hcp as string,
      appointmentType: urlParams.appointmentType as string,
    };
  }, [window.location.href]);

  const preselection = useMemo(() => {
    return { ...blankPreselection, ...urlPreselection, ...preselectionProps };
  }, [urlPreselection, preselectionProps]);

  const {
    locations: allLocations,
    isLoading: locationsIsLoading,
    error: locationsError,
    refetch: locationsRefetch,
  } = useLocations();

  const {
    hcps: allHcps,
    isLoading: hcpsIsLoading,
    error: hcpsError,
    refetch: hcpsRefetch,
  } = useHcps();

  const {
    data: allAppointmentTypes,
    isLoading: appointmentTypesIsLoading,
    error: appointmentTypesError,
    refetch: appointmentTypesRefetch,
  } = useAppointmentTypes();

  const data = {
    allLocations,
    allHcps,
    allAppointmentTypes,
  };

  const error: Error = locationsError || hcpsError || appointmentTypesError;

  const refetch = () => {
    if (locationsError) {
      locationsRefetch();
    }
    if (hcpsError) {
      hcpsRefetch();
    }
    if (appointmentTypesError) {
      appointmentTypesRefetch();
    }
  };

  const initData = useMemo(() => {
    if (!allLocations || !allHcps || !allAppointmentTypes) return null;

    return {
      initLocation: allLocations.find(
        (l) => preselection.location && l.slug === preselection.location,
      ),
      initHcp: allHcps.find(
        (l) => preselection.hcp && l.slug === preselection.hcp,
      ),
      initAppointmentType: allAppointmentTypes.find(
        (l) =>
          preselection.appointmentType &&
          l.slug === preselection.appointmentType,
      ),
      initSlot: preselection.slot,
    };
  }, [preselection, allLocations, allHcps, allAppointmentTypes]);

  // wait for all data before starting the
  const isLoading =
    locationsIsLoading || hcpsIsLoading || appointmentTypesIsLoading;

  return (
    <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
      {initData && (
        <BookingProviderInner {...rest} {...data} {...initData}>
          {isLoading ? null : children}
        </BookingProviderInner>
      )}
    </LoadingBlock>
  );
};
