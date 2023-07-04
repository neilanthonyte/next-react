import { inject, injectable } from "inversify";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import {
  IStatisticsModule,
  IPractitionerAppointmentsCountResult,
  ITodaysAppointments,
} from "../modules/StatisticsModule";
import { randomNum } from "../../helpers/random";
import { IHcpsModule } from "../modules/HcpsModule";
import { IAggregateResponse } from "next-shared/src/models/Rating";

const getRandomStatisticNumber = (multiplier?: number) => {
  const num = randomNum(300);
  return multiplier ? num * multiplier : num;
};

@injectable()
export class MockStatisticsModule implements IStatisticsModule {
  constructor(@inject("HcpsModule") private _mockHcpsModule: IHcpsModule) {}

  public async getPatientAppSignupCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getPatientAppSignupCountForLocation(
    id: string,
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getPatientAppSignupCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getCompanionFilledCountOutForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getCompanionFilledCountOutForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getImagesTakenOnPractitionerAppCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getImagesTakenOnPractitionerAppCountAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getPatientCountForCurrentLocation(): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getPatientCountForAllLocations(): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getActivePatientAppUsersCountForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber();
  }

  public async getActivePatientAppUsersCountForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getTodaysAppointmentsCountForCurrentLocation(): Promise<ITodaysAppointments> {
    return {
      appointments: getRandomStatisticNumber(),
      preFilled: getRandomStatisticNumber(),
    };
  }

  public async getTodaysAppointmentsCountForAllLocations(): Promise<number> {
    return getRandomStatisticNumber(5);
  }

  public async getClinicRatingForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<any> {
    return {
      average: parseFloat(`${randomNum(5)}.${randomNum(99)}`),
      count: getRandomStatisticNumber(),
    };
  }

  public async getClinicRatingForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<any> {
    return {
      average: parseFloat(`${randomNum(5)}.${randomNum(99)}`),
      count: getRandomStatisticNumber(5),
    };
  }

  public async getTodaysPractitionerAppointmentCountForCurrentLocation(): Promise<IPractitionerAppointmentsCountResult> {
    const prac = await this._mockHcpsModule.retrieveAllHcps();
    return [
      {
        count: 10,
        practitioner: prac[0],
      },
      {
        count: randomNum(15),
        practitioner: prac[1],
      },
    ];
  }

  public async getPaRatingsForCurrentLocation(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]> {
    return [
      { rateeId: "dr-sko", count: 2, average: 5 },
      { rateeId: "kory-porter-1", count: 5, average: 4.2 },
      { rateeId: "dan", count: 5, average: 4.2 },
    ];
  }

  public async getPaRatingsForAllLocations(
    from: unixTimestamp,
    to: unixTimestamp,
  ): Promise<IAggregateResponse[]> {
    return [
      { rateeId: "dr-sko", count: 2, average: 5 },
      { rateeId: "kory-porter-1", count: 5, average: 4.2 },
      { rateeId: "dan", count: 5, average: 4.2 },
    ];
  }
}
