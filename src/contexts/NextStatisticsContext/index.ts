import * as React from "react";
import {
  IPractitionerAppointmentsCountResult,
  ITodaysAppointments,
} from "../../client/modules/StatisticsModule";

/** count is the amount of ratings that make up that average */
export type IClinicRatingStatistic = IStatisticItem<{
  count: number;
  average: number;
}>;

export interface IStatisticItem<X> {
  current: X;
  previous: X;
}

export interface INextStatistics {
  totalPatientCount: number;
  todaysAppointments: ITodaysAppointments;
  todaysPractitionerAppointments: IPractitionerAppointmentsCountResult;
  activeAppUsers: IStatisticItem<number>;
  appSignups: IStatisticItem<number>;
  newPatients: IStatisticItem<number>;
  clinicRating: IClinicRatingStatistic;
  preFillNotes: IStatisticItem<number>;
  practitionerAppPhotos: IStatisticItem<number>;
  networkActiveAppUsers: IStatisticItem<number>;
  networkClinicRating: IClinicRatingStatistic;
}

export interface INextStatisticsContext {
  isLoaded: boolean;
  statistics: INextStatistics;
}

export const getDefaultNextStatisticsState = (): INextStatisticsContext => ({
  isLoaded: undefined,
  statistics: {
    totalPatientCount: undefined,
    todaysAppointments: undefined,
    todaysPractitionerAppointments: undefined,
    clinicRating: {
      current: {
        average: undefined,
        count: undefined,
      },
      previous: {
        average: undefined,
        count: undefined,
      },
    },
    networkClinicRating: {
      current: {
        average: undefined,
        count: undefined,
      },
      previous: {
        average: undefined,
        count: undefined,
      },
    },
    activeAppUsers: {
      current: undefined,
      previous: undefined,
    },
    networkActiveAppUsers: {
      current: undefined,
      previous: undefined,
    },
    appSignups: {
      current: undefined,
      previous: undefined,
    },
    newPatients: {
      current: undefined,
      previous: undefined,
    },
    preFillNotes: {
      current: undefined,
      previous: undefined,
    },
    practitionerAppPhotos: {
      current: undefined,
      previous: undefined,
    },
  },
});

export const NextStatisticsContext =
  React.createContext<INextStatisticsContext>({
    ...getDefaultNextStatisticsState(),
  });
