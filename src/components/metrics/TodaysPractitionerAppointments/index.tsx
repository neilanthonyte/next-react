import * as React from "react";
import { useContext } from "react";
import { NextStatisticsContext } from "../../../contexts/NextStatisticsContext";
import { FeedbackMetric } from "../../generic/FeedbackMetric";
import { Grid } from "../../structure/Grid";
import { LoadingBlock } from "../../structure/LoadingBlock";

/**
 * Displays a breakdown of the appointments that exist between the practitioners at a location
 *
 * @note - this component is a grid of <FeedbackMetric />'s.
 */
export const TodaysPractitionerAppointmentsMetric: React.FC = () => {
  const { statistics, isLoaded } = useContext(NextStatisticsContext);

  const todaysPractitionerAppointments =
    statistics?.todaysPractitionerAppointments;

  // this metric is slightly different to the others in the fact that it renders out multiple feedback metrics,
  // so we use a feedback metric group to wrap the metrics
  return (
    <LoadingBlock isLoading={!isLoaded}>
      {todaysPractitionerAppointments && (
        <Grid>
          {todaysPractitionerAppointments.map((a) => {
            return (
              <FeedbackMetric
                key={a.practitioner.npServicesId}
                decorationImage={a.practitioner.profileImage.squareSmall}
                value={a.count}
                name={a.practitioner.title}
              />
            );
          })}
        </Grid>
      )}
    </LoadingBlock>
  );
};
