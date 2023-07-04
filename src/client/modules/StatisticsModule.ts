import { inject, injectable } from "inversify";
import moment from "moment";

import { IHttpConnection } from "../connections/HttpConnection";
import { ICompanyHelpers } from "../CompanyHelpers";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { IAuthModule } from "./AuthModule";
import { Hcp } from "next-shared/src/models/Hcp";
import { IAggregateResponse } from "next-shared/src/models/Rating";

interface IRatingsResult {
  average: number | null;
  count: number;
}

export type IPractitionerAppointmentsCountResult = Array<{
  count: number;
  practitioner: Hcp;
}>;

export interface ITodaysAppointments {
  appointments: number;
  preFilled: number;
}

/**
 * Any methods on this interface that query for all locations require special auth.
 */
export interface IStatisticsModule {
  getPatientAppSignupCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getPatientAppSignupCountForLocation(
    locationSlug: string,
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getPatientAppSignupCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getCompanionFilledCountOutForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getImagesTakenOnPractitionerAppCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getActivePatientAppUsersCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getActivePatientAppUsersCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number>;

  getClinicRatingForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IRatingsResult>;

  getClinicRatingForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IRatingsResult>;

  getTodaysAppointmentsCountForCurrentLocation(): Promise<ITodaysAppointments>;

  getTodaysAppointmentsCountForAllLocations(): Promise<number>;

  getTodaysPractitionerAppointmentCountForCurrentLocation(): Promise<IPractitionerAppointmentsCountResult>;

  getPatientCountForCurrentLocation(): Promise<number>;

  getPaRatingsForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]>;

  getPaRatingsForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]>;
}

@injectable()
export class StatisticsModule implements IStatisticsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
    @inject("AuthModule") private _auth: IAuthModule,
  ) {}

  public async getPatientAppSignupCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const slug = await this._companyHelpers.getActiveLocationSlug();
    return this.getPatientAppSignupCountForLocation(slug, from, to);
  }

  public async getPatientAppSignupCountForLocation(
    locationSlug: string,
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${locationSlug}/patient-app-signup`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getPatientAppSignupCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/all/patient-app-signup`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getCompanionFilledCountOutForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/companions-filled-out`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getImagesTakenOnPractitionerAppCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/images-taken-on-practitioner-app`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getPatientCountForCurrentLocation(): Promise<number> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/patient-count`,
      method: "get",
    });

    return res.count;
  }

  public async getActivePatientAppUsersCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/active-patients-on-app`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getActivePatientAppUsersCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/all/active-patients-on-app`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.count;
  }

  public async getTodaysAppointmentsCountForCurrentLocation(): Promise<ITodaysAppointments> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    return await this._httpConnection.makeRequest({
      url: `statistics/${slug}/todays-appointments`,
      method: "get",
    });
  }

  public async getTodaysAppointmentsCountForAllLocations(): Promise<number> {
    const res = await this._httpConnection.makeRequest({
      url: `statistics/all/todays-appointments`,
      method: "get",
    });

    return res.appointments;
  }

  public async getClinicRatingForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<any> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/clinic-rating`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return {
      average: res.average,
      count: res.count,
    };
  }

  public async getClinicRatingForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<any> {
    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/all/clinic-rating`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return {
      average: res.average,
      count: res.count,
    };
  }

  public async getTodaysPractitionerAppointmentCountForCurrentLocation(): Promise<IPractitionerAppointmentsCountResult> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/practitioner-appointments`,
      method: "get",
      params: {
        from: moment().startOf("day").unix().toString(),
        to: moment().endOf("day").unix().toString(),
      },
    });

    return res.practitionerAppointments;
  }

  public async getPaRatingsForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]> {
    const slug = await this._companyHelpers.getActiveLocationSlug();

    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/${slug}/pa-ratings`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.groupedStatistics;
  }

  public async getPaRatingsForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]> {
    const fromStr = from.toString();
    const toStr = to.toString();

    const res = await this._httpConnection.makeRequest({
      url: `statistics/all/pa-ratings`,
      method: "get",
      params: {
        from: fromStr,
        to: toStr,
      },
    });

    return res.groupedStatistics;
  }
}
