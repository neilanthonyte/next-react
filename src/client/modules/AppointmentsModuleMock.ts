import { injectable } from "inversify";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { createBlankObservation } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import {
  reviewedItemDateExtensionUrl,
  reviewedItemPerformerExtensionUrl,
  reviewedItemStatusExtensionUrl,
  reviewItemReviewedExtensionUrl,
} from "next-shared/src/helpers/constants";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { NotFoundError } from "next-shared/src/helpers/errorTypes";
import { mockAppointmentsWithDetails } from "next-shared/src/mockData/mockAppointments";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { IAppointmentBookingDetails } from "next-shared/src/types/IAppointmentBookingDetails";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import {
  IFormResources,
  MedicalResourceType,
} from "next-shared/src/types/types";
import { getReasonForVisitFormSlug } from "next-shared/src/helpers/getReasonForVisitFormSlug";

import { delay } from "../../helpers/delay";
import { IAppointmentsModule } from "../modules/AppointmentsModule";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { findAppointmentTypeFromAppointment } from "next-shared/src/helpers/findAppointmentTypeFromAppointment";

@injectable()
export class MockAppointmentsModule implements IAppointmentsModule {
  private _appointmentsWithDetails: IAppointmentWithDetails[];

  constructor() {
    this._appointmentsWithDetails = mockAppointmentsWithDetails;
  }

  public async createAppointment(
    appointmentBookingDetails: IAppointmentBookingDetails,
  ): Promise<void> {
    return null;
  }

  public async cancelAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    cancellationToken: string,
  ): Promise<void> {
    await delay(1000);
    const appointmentWithDetails = this._appointmentsWithDetails.find((a) => {
      const appointmentEhrId = fhirUtil(a.appointment).getOriginEhrId();
      return (
        a.appointment.id === ehrAppointmentId && appointmentEhrId === ehrId
      );
    });
    if (!appointmentWithDetails) {
      throw new NotFoundError();
    }
    const newAppointment = { ...appointmentWithDetails.appointment };
    newAppointment.status = "cancelled";
    const newAppointmentWithDetails: IAppointmentWithDetails = {
      ...appointmentWithDetails,
      appointment: newAppointment,
    };
    this._appointmentsWithDetails = this._appointmentsWithDetails
      .filter((a) => a.appointment.id !== ehrAppointmentId)
      .concat(newAppointmentWithDetails);
  }

  public async retrieveAppointment(
    ehrId: string,
    ehrAppointmentId: string,
    token?: string,
  ): Promise<IAppointmentWithDetails> {
    await delay(1000);
    const appointment = this._appointmentsWithDetails.find(
      (a) =>
        a.appointment.id === ehrAppointmentId && a.location.ehrId === ehrId,
    );
    if (!appointment) {
      throw new NotFoundError();
    }
    return appointment;
  }

  public async retrieveAppointmentsForPatient(
    patientId: string,
  ): Promise<IAppointmentWithDetails[]> {
    await delay(1000);
    return this._appointmentsWithDetails;
  }

  public async retrieveAppointmentsForEhrPatient(
    ehrPatientId: string,
  ): Promise<IAppointmentWithDetails[]> {
    await delay(1000);
    return this._appointmentsWithDetails;
  }

  public async sendBookingConfirmation(
    ehrAppointmentId: string,
  ): Promise<void> {
    return null;
  }

  public async acceptAppointmentReviewItems(
    ehrAppointmentId: string,
    itemIds: string[],
  ): Promise<void> {
    await delay(1000);
    const appointment = this._appointmentsWithDetails.find(
      (appt) => appt.appointment.id === ehrAppointmentId,
    );

    const formIds: string[] = appointment.forms?.map((f) => f.id) || [];

    if (!appointment) {
      throw new NotFoundError();
    }
    // ensure we have all forms
    if (itemIds.filter((id) => formIds.indexOf(id) === -1).length) {
      throw new NotFoundError();
    }

    // Add EHR-specific 'accepted' extension ReviewedItemExtensionUrl
    appointment.forms = appointment.forms.map((form) =>
      fhirUtil(form).setExtension({
        extension: [
          {
            url: reviewedItemPerformerExtensionUrl,
            valueString: appointment.hcp.fhirDisplayName,
          },
          {
            url: reviewedItemStatusExtensionUrl,
            valueString: "accepted",
          },
          {
            url: reviewedItemDateExtensionUrl,
            valueInteger: currentUnixTimestamp(),
          },
        ],
        url: `${reviewItemReviewedExtensionUrl}/${appointment.location.slug}`,
      }),
    );

    const newAppointments = this._appointmentsWithDetails.filter((appt) => {
      appt.appointment.id !== ehrAppointmentId;
    });

    this._appointmentsWithDetails = newAppointments;
  }

  public async storeAppointmentFormData(
    ehrId: string,
    ehrAppointmentId: string,
    data: IFormResources,
    appointmentFormSlug?: string,
  ): Promise<void> {
    await delay(1000);
    // appointment lookup
    const appointmentWithDetail = this._appointmentsWithDetails.find(
      (a) => a.appointment.id === ehrAppointmentId,
    );
    if (!appointmentWithDetail) throw new NotFoundError();

    const { appointment, location, forms } = appointmentWithDetail;

    const appointmentType = findAppointmentTypeFromAppointment(
      appointment,
      mockAppointmentTypes,
    );

    const slug =
      appointmentFormSlug ||
      getReasonForVisitFormSlug({ appointmentType, location, form: forms[0] });

    // HACK treat as single reason
    const newReason: fhir3.Observation = {
      ...createBlankObservation({
        type: MedicalResourceType.ReasonForVisit,
        title: "Reason for visit",
        slug,
      }),
      ...(Object.values(data)[0] as fhir3.Observation),
      meta: { lastUpdated: moment().format() },
    };

    // substitute form
    const newAppointmentWithDetail = cloneModelObject(appointmentWithDetail);
    newAppointmentWithDetail.forms = [newReason];
    // save new appointments list
    const newAppointments = this._appointmentsWithDetails.filter(
      (appt) => appt.appointment.id !== ehrAppointmentId,
    );

    this._appointmentsWithDetails = newAppointments.concat([
      newAppointmentWithDetail,
    ]);
  }

  public async storeAppointmentPaymentInformation(
    ehrId: string,
    ehrAppointmentId: string,
    paymentNonce: string,
  ): Promise<void> {
    console.warn("storeAppointmentPaymentInformation called - nothing to do");
  }

  public async notifyAppointmentChangeSubscribers(
    ehrPatientId: string,
  ): Promise<void> {
    console.warn("notifyAppointmentChangeSubscribers called - nothing to do");
  }
}
