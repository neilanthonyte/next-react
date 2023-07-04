import { inject, injectable } from "inversify";
import * as _ from "lodash";
import moment from "moment";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import {
  mockAppointmentTypes,
  mockAppointmentTypeNoAvailabilitySlug,
} from "next-shared/src/mockData/mockAppointmentTypes";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockSlotsWithHcps } from "next-shared/src/mockData/mockSlots";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";

import { IAppointmentBookingsModule } from "../modules/AppointmentBookingsModule";
import { delay } from "../../helpers/delay";
import { IHttpConnection } from "../connections/HttpConnection";
import { IWebSocketConnection } from "../connections/WebSocketConnection";
import { IDateRange } from "../../hooks/useBookingSlots";
import { mockProvisionalPatientSession } from "next-shared/src/mockData/mockAuth";

@injectable()
export class MockAppointmentBookingsModule
  implements IAppointmentBookingsModule
{
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("WebSocketConnection")
    private _webSocketConnection: IWebSocketConnection,
  ) {}

  public async retrieveLocations(): Promise<NextLocation[]> {
    await delay(1000);
    return mockNextLocations;
  }

  public async retrieveAppointmentTypes(
    locationSlug: string,
  ): Promise<AppointmentType[]> {
    await delay(1000);
    // shuffle to show the app can handle out of order appointment types
    return _.shuffle(mockAppointmentTypes);
  }

  public async retrieveHcps(locationSlug: string): Promise<Hcp[]> {
    await delay(1000);
    return mockHcps;
  }

  public async retrieveNextAvailable(
    appointmentType: AppointmentType,
    hcpId: string,
  ): Promise<moment.Moment> {
    await delay(1000);
    return appointmentType.slug === mockAppointmentTypeNoAvailabilitySlug
      ? null
      : moment(mockSlotsWithHcps[0].start);
  }

  public async retrieveSlots(
    appointmentType: AppointmentType,
    dateRange: IDateRange,
    hcpId?: string,
  ): Promise<ISlotWithHcp[]> {
    await delay(500);
    return mockSlotsWithHcps
      .filter((s) => s.appointmentType === appointmentType.slug)
      .filter((s) => !hcpId || s.hcp.npServicesId === hcpId);
  }

  public async matchOrCreatePatient(
    locationSlug: string,
    patient: fhir3.Patient,
  ): Promise<{ requireLogin: boolean; session: null | Session }> {
    await delay(1000);
    if (
      !!patient.name[0]?.family &&
      patient.name[0]?.family === mockPatients[0].fhir.name[0].family
    ) {
      return {
        requireLogin: true,
        session: null,
      };
    }

    const newSession = mockProvisionalPatientSession;
    return {
      requireLogin: false,
      session: newSession,
    };
  }

  public async checkForMatchingPatient(
    patient: fhir3.Patient,
  ): Promise<ICheckForMatchingPatientResult> {
    await delay(1000);

    const email = fhirUtil<FhirPersonUtil>(patient).getPrimaryEmail();
    const mockEmail = fhirUtil<FhirPersonUtil>(
      mockPatients[0].fhir,
    ).getPrimaryEmail();

    return {
      emailMatch: email === mockEmail,
      identifiersMatch:
        patient?.name[0]?.family === mockPatients[0].fhir.name[0].family,
    };
  }

  public async bookAppointment(): Promise<void> {
    // TODO tailor based on details provided
    await delay(1000);

    return;
  }
}
