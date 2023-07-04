import { inject, injectable } from "inversify";

import { IAppointmentBookingDetails } from "next-shared/src/types/IAppointmentBookingDetails";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { IFormResources } from "next-shared/src/types/types";

import { IHttpConnection } from "../connections/HttpConnection";
import { NextNoActiveConsultError } from "../../helpers/errorTypes";

export interface IAppointmentsModule {
  createAppointment(
    appointmentBookingDetails: IAppointmentBookingDetails,
  ): Promise<void>;
  cancelAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    cancellationToken: string,
  ): Promise<void>;
  retrieveAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    token?: string,
  ): Promise<IAppointmentWithDetails>;

  retrieveAppointmentsForPatient(
    patientId: string,
  ): Promise<IAppointmentWithDetails[]>;
  retrieveAppointmentsForEhrPatient(
    ehrPatientId: string,
  ): Promise<IAppointmentWithDetails[]>;

  sendBookingConfirmation(ehrAppointmentId: string): Promise<void>;
  acceptAppointmentReviewItems(
    ehrAppointmentId: string,
    itemIds: string[],
  ): Promise<void>;
  storeAppointmentFormData(
    ehrId: string,
    ehrAppointmentId: string,
    data: IFormResources,
    appointmentFormSlug?: string,
  ): Promise<void>;
  storeAppointmentPaymentInformation(
    ehrId: string,
    ehrAppointmentId: string,
    paymentNonce: string,
  ): Promise<void>;
  notifyAppointmentChangeSubscribers(ehrPatientId: string): Promise<void>;
}

@injectable()
export class AppointmentsModule implements IAppointmentsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async createAppointment(
    appointmentBookingDetails: IAppointmentBookingDetails,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: "appointments",
      method: "post",
      data: appointmentBookingDetails,
    });
  }

  public async cancelAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    cancellationToken: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `appointments/${ehrAppointmentId}/cancel-appointment`,
      method: "post",
      params: { ehrId, cancellationToken },
    });
  }

  public async retrieveAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    token?: string,
  ): Promise<IAppointmentWithDetails> {
    const res = await this._httpConnection.makeRequest({
      url: `appointments/${ehrAppointmentId}`,
      method: "get",
      params: { ehrId, token },
    });

    return {
      ...res.appointment,
      hcp: res.appointment.hcp ? Hcp.unserialize(res.appointment.hcp) : null,
      location: NextLocation.unserialize(res.appointment.location),
    };
  }

  public async retrieveAppointmentsForPatient(
    patientId: string,
  ): Promise<IAppointmentWithDetails[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/appointments`,
      method: "get",
    });

    return res.map((appt: IAppointmentWithDetails) => ({
      ...appt,
      hcp: appt.hcp ? Hcp.unserialize(appt.hcp) : null,
      location: appt.location ? NextLocation.unserialize(appt.location) : null,
    }));
  }

  public async retrieveAppointmentsForEhrPatient(
    ehrPatientId: string,
  ): Promise<IAppointmentWithDetails[]> {
    const appointments = await this._httpConnection.makeRequest({
      // TODO temp made up url, fix once implemented
      url: `patients/${ehrPatientId}/ehr-patient-appointments`,
      method: "get",
    });

    return appointments.map(
      (appt: IAppointmentWithDetails) =>
        ({
          ...appt,
          hcp: appt.hcp ? Hcp.unserialize(appt.hcp) : null,
          location: NextLocation.unserialize(appt.location),
        } as IAppointmentWithDetails),
    );
  }

  public async notifyAppointmentChangeSubscribers(
    ehrPatientId: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${ehrPatientId}/ehr-patient-appointments/change`,
      method: "post",
    });
  }

  public async sendBookingConfirmation(
    ehrAppointmentId: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `appointments/${ehrAppointmentId}/send-booking-confirmation`,
      method: "post",
    });
  }

  public async acceptAppointmentReviewItems(
    ehrAppointmentId: string,
    itemIds: string[],
  ): Promise<void> {
    try {
      await this._httpConnection.makeRequest({
        url: `appointments/${ehrAppointmentId}/accept-items`,
        method: "post",
        data: { itemIds },
      });
    } catch (error) {
      if (error.message === "No available consult in Helix") {
        throw new NextNoActiveConsultError(error.message);
      }
      throw error;
    }
  }

  public async storeAppointmentFormData(
    ehrId: string,
    ehrAppointmentId: string,
    data: IFormResources,
    appointmentFormSlug?: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `appointments/${ehrAppointmentId}/form-data`,
      method: "post",
      data: { data, ehrId, appointmentFormSlug },
    });
  }

  public async storeAppointmentPaymentInformation(
    ehrId: string,
    ehrAppointmentId: string,
    paymentNonce: string,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `appointments/${ehrAppointmentId}/payment-information`,
      method: "post",
      data: { paymentNonce, ehrId },
    });
  }
}
