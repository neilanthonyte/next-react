import * as React from "react";
import { useContext, useState, useRef, useEffect, useMemo } from "react";
import {
  NextStatisticsContext,
  INextStatisticsContext,
  INextStatistics,
  getDefaultNextStatisticsState,
} from "../../../contexts/NextStatisticsContext";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";
import moment from "moment";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

// Testing component needs to be a part of NextStatistic for Styleguidist to compile it properly
export const Testing: React.FC = () => {
  const val = React.useContext(NextStatisticsContext);

  return (
    <div>
      <br />
      <div>
        <p>Active App</p>
        <div>current: {val.statistics.activeAppUsers.current}</div>
        <div>previous: {val.statistics.activeAppUsers.previous}</div>
      </div>
      <br />
      <div>
        <p>preFillNotes</p>
        <div>current: {val.statistics.preFillNotes.current}</div>
        <div>previous: {val.statistics.preFillNotes.previous}</div>
      </div>
      <br />
      <div>
        <p>App signups</p>
        <div>current: {val.statistics.appSignups.current}</div>
        <div>previous: {val.statistics.appSignups.previous}</div>
      </div>
      <br />
      <div>
        <p>Prac app photos taken</p>
        <div>current: {val.statistics.practitionerAppPhotos.current}</div>
        <div>previous: {val.statistics.practitionerAppPhotos.previous}</div>
      </div>
      <br />
      <div>
        <p>Total patient count</p>
        <div>{val.statistics.totalPatientCount}</div>
      </div>
      <br />
      <div>
        <p>Todays appointments</p>
        <div>{val.statistics.todaysAppointments}</div>
      </div>
      <br />
      <div>
        <p>Clinic Ratings</p>
        <div>
          Current Average: {val.statistics.clinicRating.current.average}
        </div>
        <div>Current Count: {val.statistics.clinicRating.current.count}</div>
        <div>
          Previous Average: {val.statistics.clinicRating.previous.average}
        </div>
        <div>Previous Count: {val.statistics.clinicRating.previous.count}</div>
      </div>
      <br />
      <div>
        <p>Netork wide Clinic Ratings</p>
        <div>
          Current Average: {val.statistics.networkClinicRating.current.average}
        </div>
        <div>
          Current Count: {val.statistics.networkClinicRating.current.count}
        </div>
        <div>
          Previous Average:{" "}
          {val.statistics.networkClinicRating.previous.average}
        </div>
        <div>
          Previous Count: {val.statistics.networkClinicRating.previous.count}
        </div>
      </div>
    </div>
  );
};

// TODO - unit test.
const getDateRangeToQuery = (
  range: number,
): {
  current: { from: number; to: number };
  previous: { from: number; to: number };
} => {
  return {
    current: {
      from: moment().subtract(range, "days").unix(),
      to: currentUnixTimestamp(),
    },
    previous: {
      from: moment()
        .subtract(range * 2, "days")
        .unix(),
      to: moment().subtract(range, "days").unix(),
    },
  };
};

const fetchActiveAppUsers = async (
  client: NextClient,
  network: boolean,
  daysInTimeFrame: number,
) => {
  const { current: currentTimes, previous: previousTimes } =
    getDateRangeToQuery(daysInTimeFrame);

  if (network) {
    const [current, previous] = await Promise.all([
      client.statistics.getActivePatientAppUsersCountForAllLocations(
        currentTimes.from,
        currentTimes.to,
      ),
      client.statistics.getActivePatientAppUsersCountForAllLocations(
        previousTimes.from,
        previousTimes.to,
      ),
    ]);

    return {
      current,
      previous,
    };
  }

  const [current, previous] = await Promise.all([
    client.statistics.getActivePatientAppUsersCountForCurrentLocation(
      currentTimes.from,
      currentTimes.to,
    ),
    client.statistics.getActivePatientAppUsersCountForCurrentLocation(
      previousTimes.from,
      previousTimes.to,
    ),
  ]);

  return {
    current,
    previous,
  };
};

const fetchCompanionsFilledOutCount = async (
  client: NextClient,
  daysInTimeFrame: number,
) => {
  const { current: currentTimes, previous: previousTimes } =
    getDateRangeToQuery(daysInTimeFrame);

  const [current, previous] = await Promise.all([
    client.statistics.getCompanionFilledCountOutForCurrentLocation(
      currentTimes.from,
      currentTimes.to,
    ),
    client.statistics.getCompanionFilledCountOutForCurrentLocation(
      previousTimes.from,
      previousTimes.to,
    ),
  ]);

  return {
    current,
    previous,
  };
};

const fetchAppSignupsCount = async (
  client: NextClient,
  daysInTimeFrame: number,
) => {
  const { current: currentTimes, previous: previousTimes } =
    getDateRangeToQuery(daysInTimeFrame);

  const [current, previous] = await Promise.all([
    client.statistics.getPatientAppSignupCountForCurrentLocation(
      currentTimes.from,
      currentTimes.to,
    ),
    client.statistics.getPatientAppSignupCountForCurrentLocation(
      previousTimes.from,
      previousTimes.to,
    ),
  ]);

  return {
    current,
    previous,
  };
};

const fetchPracAppPhotosTakenCount = async (
  client: NextClient,
  daysInTimeFrame: number,
) => {
  const { current: currentTimes, previous: previousTimes } =
    getDateRangeToQuery(daysInTimeFrame);

  const [current, previous] = await Promise.all([
    client.statistics.getImagesTakenOnPractitionerAppCountForCurrentLocation(
      currentTimes.from,
      currentTimes.to,
    ),
    client.statistics.getImagesTakenOnPractitionerAppCountForCurrentLocation(
      previousTimes.from,
      previousTimes.to,
    ),
  ]);

  return {
    current,
    previous,
  };
};

const fetchClinicRatings = async (
  client: NextClient,
  network: boolean,
  daysInTimeFrame: number,
) => {
  const { current: currentTimes, previous: previousTimes } =
    getDateRangeToQuery(daysInTimeFrame);

  if (network) {
    const [current, previous] = await Promise.all([
      client.statistics.getClinicRatingForAllLocations(
        currentTimes.from,
        currentTimes.to,
      ),
      client.statistics.getClinicRatingForAllLocations(
        previousTimes.from,
        previousTimes.to,
      ),
    ]);

    return {
      current,
      previous,
    };
  }

  const [current, previous] = await Promise.all([
    client.statistics.getClinicRatingForCurrentLocation(
      currentTimes.from,
      currentTimes.to,
    ),
    client.statistics.getClinicRatingForCurrentLocation(
      previousTimes.from,
      previousTimes.to,
    ),
  ]);

  return {
    current,
    previous,
  };
};

/**
 * Provider for the NextStatisticsContext with the required statistics logic
 */
export const NextStatisticsProvider: React.FC = ({ children }) => {
  const { daysInSelectedRange } = useContext(TimeFrameContext);

  if (!daysInSelectedRange) {
    throw new Error("A time frame has not been selected ");
  }

  const daysInTimeRangeRef = useRef<number>();
  // set a ref to the most recently set time range (we use this when fetching data,
  // to compare and ensure the time range that the fetch was made for is the currently active time range)
  daysInTimeRangeRef.current = daysInSelectedRange;

  const client = useClient();

  // get the current day, refresh stats if the day changes.
  const today = useCurrentDate();

  const [statistics, setStatistics] = useState<INextStatistics>(
    getDefaultNextStatisticsState().statistics,
  );

  useEffect(() => {
    // something has caused us to re-fetch the statistics, wipe out the old ones.
    const {
      activeAppUsers,
      networkActiveAppUsers,
      preFillNotes,
      appSignups,
      practitionerAppPhotos,
      clinicRating,
      networkClinicRating,
    } = getDefaultNextStatisticsState().statistics;

    // only clear out the statistics that relate to this effect, things that aren't sensitive to time ranges, should not be reset.
    setStatistics((statistics) => ({
      ...statistics,
      activeAppUsers,
      networkActiveAppUsers,
      preFillNotes,
      appSignups,
      practitionerAppPhotos,
      clinicRating,
      networkClinicRating,
    }));

    (async () => {
      const daysInTimeFramePreFetch = daysInSelectedRange;

      const [
        activeAppUsers,
        companionsFilledOut,
        appSignups,
        pracAppPhotosTaken,
        clinicRating,
        networkClinicRating,
        networkActiveAppUsers,
      ] = await Promise.all([
        fetchActiveAppUsers(client, false, daysInSelectedRange),
        fetchCompanionsFilledOutCount(client, daysInSelectedRange),
        fetchAppSignupsCount(client, daysInSelectedRange),
        fetchPracAppPhotosTakenCount(client, daysInSelectedRange),
        // current locations clinic ratings
        fetchClinicRatings(client, false, daysInSelectedRange),
        // network wide clinic ratings
        fetchClinicRatings(client, true, daysInSelectedRange),
        fetchActiveAppUsers(client, true, daysInSelectedRange),
      ]);

      // check if the user has changed time ranges since
      if (daysInTimeRangeRef.current !== daysInTimeFramePreFetch) {
        return;
      }

      setStatistics((statistics) => ({
        ...statistics,
        activeAppUsers,
        networkActiveAppUsers,
        preFillNotes: companionsFilledOut,
        appSignups,
        practitionerAppPhotos: pracAppPhotosTaken,
        clinicRating,
        networkClinicRating,
      }));
    })().catch(console.error);
  }, [daysInSelectedRange, today]);

  // any values that do not rely on the time frame changing belong in this effect
  useEffect(() => {
    // something has caused us to re-fetch the statistics, wipe out the old ones.
    const {
      totalPatientCount,
      todaysAppointments,
      todaysPractitionerAppointments,
    } = getDefaultNextStatisticsState().statistics;

    // only clear out the statistics that relate to this effect
    setStatistics((statistics) => ({
      ...statistics,
      totalPatientCount,
      todaysAppointments,
      todaysPractitionerAppointments,
    }));

    (async () => {
      const [
        totalPatientCount,
        todaysAppointments,
        todaysPractitionerAppointments,
      ] = await Promise.all([
        client.statistics.getPatientCountForCurrentLocation(),
        client.statistics.getTodaysAppointmentsCountForCurrentLocation(),
        client.statistics.getTodaysPractitionerAppointmentCountForCurrentLocation(),
      ]);

      setStatistics((statistics) => ({
        ...statistics,
        totalPatientCount,
        todaysAppointments,
        todaysPractitionerAppointments,
      }));
    })().catch(console.error);
  }, [today]);

  /**
   * NOTE
   *
   * When new metrics are added to this context, you will need add it to the below check.
   */
  const isLoaded = useMemo(() => {
    return (
      statistics.activeAppUsers.current !== null &&
      statistics.activeAppUsers.previous !== null &&
      statistics.networkActiveAppUsers.current !== null &&
      statistics.networkActiveAppUsers.previous !== null &&
      statistics.appSignups.current !== null &&
      statistics.appSignups.previous !== null &&
      statistics.clinicRating.current.count !== null &&
      statistics.clinicRating.previous.count !== null &&
      statistics.networkClinicRating.current.count !== null &&
      statistics.networkClinicRating.previous.count !== null &&
      statistics.practitionerAppPhotos.current !== null &&
      statistics.practitionerAppPhotos.previous !== null &&
      statistics.preFillNotes.current !== null &&
      statistics.preFillNotes.previous !== null &&
      statistics.todaysAppointments !== null &&
      statistics.totalPatientCount !== null &&
      statistics.todaysPractitionerAppointments !== null
      // TODO - when newPatients exists as a metric, add it here!
    );
  }, [statistics]);

  const contextValue: INextStatisticsContext = {
    isLoaded: isLoaded,
    statistics: statistics,
  };

  return (
    <NextStatisticsContext.Provider value={contextValue}>
      {children}
    </NextStatisticsContext.Provider>
  );
};
