import { inject, injectable } from "inversify";
import moment from "moment";
import { Moment } from "moment";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import {
  AppointmentType,
  IAppointmentType,
} from "next-shared/src/models/AppointmentType";
import {
  ISerializedNextLocation,
  NextLocation,
} from "next-shared/src/models/NextLocation";
import { Hcp, IHcp } from "next-shared/src/models/Hcp";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";

import { IHttpConnection } from "../connections/HttpConnection";
import { IDateRange } from "../../hooks/useBookingSlots";

export interface IBookAppointmentOptions {
  patient: fhir3.Patient;
  // payments
  singleUseCreditCardToken?: string;
  usePatientsCreditCard?: boolean;
  // next service ID
  practitionerId: string;
  // times - unix timestamp
  start: number;
  // location HUB id
  extension: fhir3.Extension[];
  // TODO - move to this and remove location ID / helixID
  appointmentType: string;
  overrideAppointmentLength?: number;
  returnImmediately?: boolean;
  reasonForVisit?: Partial<fhir3.Observation>;
}

export interface IAppointmentBookingsModule {
  retrieveLocations(): Promise<NextLocation[]>;
  retrieveHcps(locationSlug: string): Promise<Hcp[]>;
  retrieveAppointmentTypes(locationSlug?: string): Promise<AppointmentType[]>;
  retrieveNextAvailable(
    appointmentType: AppointmentType,
    hcpId: string,
  ): Promise<Moment>;
  retrieveSlots(
    appointmentType: AppointmentType,
    dateRange: IDateRange,
    hcpId?: string,
    overrideAppointmentLength?: number,
  ): Promise<ISlotWithHcp[]>;
  matchOrCreatePatient(
    locationSlug: string,
    patient: fhir3.Patient,
    acceptTerms?: boolean,
  ): Promise<{ requireLogin: boolean; session: null | Session }>;
  bookAppointment(options: IBookAppointmentOptions): Promise<void>;
  checkForMatchingPatient(
    patient: fhir3.Patient,
  ): Promise<ICheckForMatchingPatientResult>;
}

@injectable()
export class AppointmentBookingsModule implements IAppointmentBookingsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveLocations(): Promise<NextLocation[]> {
    const res = await this._httpConnection.makeRequest({
      url: `bookings/locations`,
      method: "get",
    });

    return res.availableLocations.map((l: ISerializedNextLocation) =>
      NextLocation.unserialize(l),
    );
  }

  public async retrieveAppointmentTypes(
    locationSlug: string,
  ): Promise<AppointmentType[]> {
    const params: { [key: string]: string } = {};
    if (locationSlug) {
      params["location"] = locationSlug;
    }
    const res = await this._httpConnection.makeRequest({
      url: `bookings/appointment-types`,
      method: "get",
      params,
    });

    return res.appointmentTypes.map((l: IAppointmentType) =>
      AppointmentType.unserialize(l),
    );
  }

  public async retrieveHcps(locationSlug: string): Promise<Hcp[]> {
    const res = await this._httpConnection.makeRequest({
      url: `bookings/hcps`,
      method: "get",
      params: {
        location: locationSlug,
      },
    });

    return res.hcps.map((hcp: IHcp) => Hcp.unserialize(hcp));
  }

  public async retrieveNextAvailable(
    appointmentType: AppointmentType,
    hcpId: string,
  ): Promise<moment.Moment> {
    const res = await this._httpConnection.makeRequest({
      url: `hcps/${hcpId}/dailyAvailability`,
      method: "get",
      params: {
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(1, "year").format("YYYY-MM-DD"),
        appointmentLength: appointmentType.lengthMinutes.toString(),
        appointmentType: appointmentType.slug,
      },
    });
    return Array.isArray(res.availableDays) && res.availableDays.length > 0
      ? moment(res.availableDays[0], "YYYY-MM-DD")
      : null;
  }

  public async retrieveSlots(
    appointmentType: AppointmentType,
    dateRange?: IDateRange,
    hcpId?: string,
    overrideAppointmentLength?: number,
  ): Promise<ISlotWithHcp[]> {
    const res = await this._httpConnection.makeRequest({
      url: `bookings/slots`,
      method: "get",
      params: {
        appointmentType: appointmentType.slug,
        startDate: dateRange ? dateRange.startDate : null,
        endDate: dateRange ? dateRange.endDate : null,
        hcp: hcpId,
        overrideAppointmentLength: overrideAppointmentLength
          ? overrideAppointmentLength.toString()
          : null,
      },
    });

    return res.slots;
  }

  public async matchOrCreatePatient(
    locationSlug: string,
    patient: fhir3.Patient,
    acceptedTerms: boolean = false,
  ): Promise<{ requireLogin: boolean; session: null | Session }> {
    const res = await this._httpConnection.makeRequest({
      url: `bookings/match-or-create-patient`,
      method: "post",
      data: { locationSlug, patient, acceptedTerms },
    });

    return {
      requireLogin: res.requireLogin,
      session: res.session ? Session.unserialize(res.session) : res.session,
    };
  }

  // TODO: possibly add ehrId or locationSlug to request payload for the potential booking, then return
  // 'existingEhrPatient' Boolean (and adding that property to ICheckForMatchingPatientResult)
  // as flag to control when additional demographic forms display, e.g. shown for a brand new
  // patient to the EHR (since we're creating it with bookAppointment in the next workflow step)
  public async checkForMatchingPatient(
    patient: fhir3.Patient,
  ): Promise<ICheckForMatchingPatientResult> {
    const res = await this._httpConnection.makeRequest({
      url: `bookings/check-for-matching-patient`,
      method: "post",
      data: { patient },
    });
    return {
      emailMatch: res.emailMatch,
      identifiersMatch: res.identifiersMatch,
    };
  }

  public async bookAppointment(options: IBookAppointmentOptions) {
    await this._httpConnection.makeRequest({
      url: "bookings/book-appointment",
      method: "post",
      data: options,
      // expose the underlying AxiosError object for better error handling by the FE component.
      handleOwnError: true,
    });
  }
}
