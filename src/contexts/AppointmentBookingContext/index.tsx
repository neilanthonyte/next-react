import * as React from "react";

import {
  AppointmentType,
  TAppointmentTypePatientType,
} from "next-shared/src/models/AppointmentType";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { Hcp } from "next-shared/src/models/Hcp";
import {
  ICreditCard,
  IProvisionalCreditCard,
} from "next-shared/src/types/ICreditCard";

export const BOOKING_STAGES: { [key: string]: number } = {
  Location: 1,
  Type: 2,
  OtherConcerns: 3,
  Time: 4,
  Personals: 5,
  Presentation: 6,
  Payment: 7,
  Review: 8,
  Processing: 9,
  Complete: 10,
} as const;

export const SKIPABLE_STAGES: number[] = [
  BOOKING_STAGES.OtherConcerns,
  BOOKING_STAGES.Time,
  BOOKING_STAGES.Personals,
  BOOKING_STAGES.Presentation,
  BOOKING_STAGES.Payment,
  BOOKING_STAGES.Review,
];

export interface IAppointmentBookingPreselection {
  location?: string;
  hcp?: string;
  appointmentType?: string;
  slot?: ISlotWithHcp;
}

export interface IAppointmentHide {
  location: boolean;
  hcp: boolean;
  appointmentType: boolean;
}

export interface IAppointmentBookingsContextValue {
  // data
  locations: NextLocation[];
  appointmentTypes: AppointmentType[];
  hcps: Hcp[];
  // background
  isAtCovidRisk: boolean;
  setIsAtCovidRisk: (atRisk: boolean) => void;
  // exempt from paying
  isExempt: boolean;
  setIsExempt: (exempt: boolean) => void;
  // preference for physical vs digital (when either is allowed)
  preferredMethod: string;
  setPreferredMethod: (method: string) => void;
  // new vs existing
  patientBookingForSelf: null | boolean;
  setPatientBookingForSelf: (newVal: null | boolean) => void;
  patientType: TAppointmentTypePatientType;
  setPatientType: (state: TAppointmentTypePatientType) => void;
  // selection
  hide: IAppointmentHide;
  selectionHasBeenMade: boolean;
  location: NextLocation;
  setLocation: (loc: NextLocation) => void;
  clearLocation: () => void;
  hcp: Hcp;
  setHcp: (hcp: Hcp) => void;
  clearHcp: () => void;
  appointmentType: AppointmentType;
  setAppointmentType: (appointment: AppointmentType) => void;
  clearAppointmentType: () => void;
  slot: ISlotWithHcp;
  setSlot: (slot: ISlotWithHcp) => void;
  clearSlot: () => void;
  // patient details
  patient: fhir3.Patient;
  setPatient: (patient: fhir3.Patient) => void;
  clearPatient: () => void;
  notes: any;
  setNotes: (notes: any) => void;
  // Payments
  setExistingCard?: (creditCard: ICreditCard) => unknown;
  setNewCard?: (creditCard: IProvisionalCreditCard) => unknown;
  existingCard?: ICreditCard;
  newCard?: IProvisionalCreditCard;
  // actions
  clear: () => void;
  onCompleteDismiss: () => void;
  bookAppointment: () => void;
  // timing
  appointmentLength: null | number;
  additionalTimeRequired: null | number;
  appointmentLengthWithExtensions: null | number;
  setAdditionalTimeRequired: (newVal: number) => void;
  /** Automatically derived based on the  */
  stage: number;
  /** Answers to the presentation form */
  presentationFormResponse: any;
  setPresentationFormResponse: (data: any) => void;
  /** State */
  setStage: (newStage: number) => void;
  guestMode?: boolean;
  updatePersonals: (
    data: any,
    onUpdated?: (patient: fhir3.Patient, isModified: boolean) => unknown,
  ) => void;
  /**
   * Completes the personals section and moves the booking flow forward. If the patient has an
   * account and they've modified their details, the details will be submitted before moving on.
   *
   * Optionally updates the patient details before completing the section (only if patientUpdates is supplied).
   *
   * @param patientUpdates optional. The patient will also be updated with the supplied details if provided.
   */
  completePersonalsSection: (patientUpdates?: fhir3.Patient) => Promise<void>;
}

export const BookingContext =
  React.createContext<IAppointmentBookingsContextValue>({
    // data
    locations: undefined,
    appointmentTypes: undefined,
    hcps: undefined,
    isAtCovidRisk: undefined,
    setIsAtCovidRisk: undefined,
    // exempt from paying
    isExempt: undefined,
    setIsExempt: undefined,
    // preference for physical vs digital (when either is allowed)
    preferredMethod: undefined,
    setPreferredMethod: undefined,
    patientBookingForSelf: undefined,
    setPatientBookingForSelf: undefined,
    patientType: undefined,
    setPatientType: undefined,
    hide: undefined,
    // selection
    selectionHasBeenMade: undefined,
    location: undefined,
    setLocation: undefined,
    clearLocation: undefined,
    hcp: undefined,
    setHcp: undefined,
    clearHcp: undefined,
    appointmentType: undefined,
    setAppointmentType: undefined,
    clearAppointmentType: undefined,
    slot: undefined,
    setSlot: undefined,
    clearSlot: undefined,
    // patient
    patient: undefined,
    setPatient: undefined,
    clearPatient: undefined,
    notes: undefined,
    setNotes: undefined,
    // payment
    setExistingCard: undefined,
    setNewCard: undefined,
    existingCard: undefined,
    newCard: undefined,
    // actions
    clear: undefined,
    onCompleteDismiss: undefined,
    bookAppointment: undefined,
    // timing
    appointmentLength: undefined,
    additionalTimeRequired: undefined,
    appointmentLengthWithExtensions: undefined,
    setAdditionalTimeRequired: undefined,
    /** Automatically derived based on the state */
    stage: undefined,
    setStage: undefined,
    /** Answers to the presentation form */
    presentationFormResponse: undefined,
    setPresentationFormResponse: undefined,
    guestMode: undefined,
    updatePersonals: undefined,
    completePersonalsSection: undefined,
  });
